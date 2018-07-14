import { Injectable } from '@angular/core';
import { MatchSet, Match, PlayerNumber, MatchEvent, MatchGame, Matches } from './model/match';
import { Player } from './model/player';
import { StorageService } from 'src/app/storage.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private storageService: StorageService) { }

  matchEvent(match: Match, event: MatchEvent): void {
    let pontuador: PlayerNumber;
    const otherPlayer = getOtherPlayer(event.player);

    if (event.event === 'ace' || event.event === 'wbh' || event.event === 'wfh') {
      pontuador = event.player;
    } else {
      pontuador = otherPlayer;
    }

    const lastSet = getLastSet(match);
    const lastGame = getLastGame(match, lastSet);

    if (lastGame.tiebreak) {
      advanceGameScoreTiebreakPoint(lastGame, pontuador, otherPlayer, getMaxTieBreakPoints(match));
    } else {
      advanceGameScoreNormalPoint(lastGame, pontuador, otherPlayer);
    }

    if (lastGame.finished) {
      advanceSetScore(lastSet, pontuador, otherPlayer);
      if (lastSet.finished || lastGame.superTiebreak) {
        advanceMatchScore(match, pontuador, otherPlayer);
        if (match.finished) {
          match.endDate = new Date();
          match.winner = pontuador;
        } else {
          match.sets.push(new MatchSet(match.sets.length + 1));
        }
      } else {
        lastSet.games.push(new MatchGame(lastSet.games.length + 1));
      }
      match.serving = getOtherPlayer(match.serving);
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
    return new Player('');
  }

  setUser(player: Player) {
    localStorage.setItem('tsm.player', JSON.stringify(player));
  }

}

function advanceMatchScore(match: Match, pontuador: PlayerNumber, otherPlayer: PlayerNumber) {
  match.score[pontuador]++;
  if (match.score[pontuador] + match.score[otherPlayer] === match.bestOf) {
    match.finished = true;
  } else {
    const trigger = (match.bestOf - 1) / 2 + 1;
    if (match.score[pontuador] === trigger) {
      match.finished = true;
    }
  }
}

function advanceSetScore(set: MatchSet, pontuador: PlayerNumber, otherPlayer: PlayerNumber) {
  advanceScore(set, pontuador, otherPlayer, 6);
}

function advanceGameScoreTiebreakPoint(game: MatchGame, pontuador: PlayerNumber, otherPlayer: PlayerNumber, maxTieBreakPoints: number): void {
  advanceScore(game, pontuador, otherPlayer, maxTieBreakPoints);
}

function advanceScore(gameOrSet: MatchSet | MatchGame, pontuador: PlayerNumber, otherPlayer: PlayerNumber, maxPoints: number) {
  gameOrSet.score[pontuador]++;
  if (gameOrSet.score[pontuador] >= maxPoints
    && (gameOrSet.score[pontuador] - gameOrSet.score[otherPlayer]) >= 2) {
    gameOrSet.finished = true;
  }
}


function getMaxTieBreakPoints(match: Match): number {
  if (match.superTieBreakLastSet && match.sets.length === match.bestOf) {
    return 10;
  }
  return 7;
}

function advanceGameScoreNormalPoint(game: MatchGame, pontuador: PlayerNumber, otherPlayer: PlayerNumber): void {
  if (game.score[pontuador] !== 3) {
    game.score[pontuador]++;

  } else {
    if (game.score[otherPlayer] !== 3 || game.advantage === pontuador) {
      game.finished = true;

    } else if (game.advantage === otherPlayer) {
      game.advantage = undefined;

    } else {
      game.advantage = pontuador;
    }
  }
}

function getLastSet(match: Match): MatchSet {
  return match.sets[match.sets.length - 1];
}

function getLastGame(match: Match, set: MatchSet): MatchGame {
  const game = set.games[set.games.length - 1];
  game.superTiebreak = isSuperTieBreak(match);
  game.tiebreak = game.superTiebreak || isTieBreak(set);
  return game;
}

function isTieBreak(set: MatchSet): boolean {
  return (set.score[0] === 6 && set.score[1] === 6);
}

function isSuperTieBreak(match: Match): boolean {
  return (match.sets.length == match.bestOf && match.score[0] === match.score[1]);
}

function getOtherPlayer(player: PlayerNumber): PlayerNumber {
  return player === 1 ? 0 : 1;
}

