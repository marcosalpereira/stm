import { Injectable } from '@angular/core';
import { MatchSet, Match, PlayerNumber, MatchEvent, MatchGame, Matches } from './model/match';
import { Player } from './model/player';
import { StorageService } from 'src/app/storage.service';
import { Subject, Observable } from 'rxjs';
import { TenisRulesService } from 'src/app/tenis-rules.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userChange$ = new Subject<Player>();
  constructor(
    private storageService: StorageService,
    private tenisRules: TenisRulesService
  ) { }

  matchEvent(match: Match, event: MatchEvent): void {
    let pontuador: PlayerNumber;
    const otherPlayer = this.tenisRules.getOtherPlayer(event.player);

    if (event.event === 'ace' || event.event === 'wbh' || event.event === 'wfh') {
      pontuador = event.player;
    } else {
      pontuador = otherPlayer;
    }

    const lastSet = this.tenisRules.getLastSet(match);
    const lastGame = this.tenisRules.getLastGame(match, lastSet);

    if (lastGame.tiebreak) {
      this.tenisRules.advanceGameScoreTiebreakPoint(lastGame, pontuador, otherPlayer, this.tenisRules.getMaxTieBreakPoints(match));
    } else {
      this.tenisRules.advanceGameScoreNormalPoint(lastGame, pontuador, otherPlayer);
    }

    if (lastGame.finished) {
      this.tenisRules.advanceSetScore(lastSet, pontuador, otherPlayer);
      if (lastSet.finished || lastGame.superTiebreak) {
        this.tenisRules.advanceMatchScore(match, pontuador, otherPlayer);
        if (match.finished) {
          match.endDate = new Date();
          match.winner = pontuador;
        } else {
          match.sets.push(new MatchSet(match.sets.length + 1));
        }
      } else {
        lastSet.games.push(new MatchGame(lastSet.games.length + 1));
      }
    }

    if (lastGame.tiebreak || lastGame.superTiebreak) {
      let sum = lastGame.score[pontuador] + lastGame.score[otherPlayer];
      if (sum % 2 === 1) {
        match.serving = this.tenisRules.getOtherPlayer(match.serving);  
      }
    } else {
      if (lastGame.finished) {
        match.serving = this.tenisRules.getOtherPlayer(match.serving);
      }
    }

    if (!match.events) {match.events = [];}
    match.events.push(event);
    this.storageService.persistMatch(match);
  }

  listMatches(): Observable<Matches> {
    return this.storageService.getMatches();
  }

  persist(match: Match): void {
    this.storageService.persistMatch(match);
  }

  findMatch(id: number): Observable<Match> {
    return this.storageService.findMatch(id);
  }

  listPlayers(): Observable<Player[]> {
    return this.storageService.getPlayers();
  }

  persistPlayers(players: Player[]) {
    this.storageService.persistPlayers(players);
  }

  getUser(): Player {
    const p = localStorage.getItem('tsm.player');
    if (p) {
      return JSON.parse(p);
    }
  }

  setUser(player: Player) {
    localStorage.setItem('tsm.player', JSON.stringify(player));
    this.userChange$.next(player);
  }

}

