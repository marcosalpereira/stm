import { Injectable } from '@angular/core';
import { MatchSet, Match, PlayerMatch, MatchEvent, MatchGame, Matches } from './model/match';
import { Player } from './model/player';
import { StorageService } from 'src/app/storage.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  matchChange$ = new Subject<Match>();

  constructor(private storageService: StorageService) { }

  matchEvent(match: Match, event: MatchEvent): void {
    let pontuador: PlayerMatch;
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

    this.storageService.persistMatch(match);
    this.matchChange$.next(match);
  }

  listMatches(): Observable<Matches> {
    return this.storageService.getMatches();
  }

  persist(match: Match): void {
    this.storageService.persistMatch(match);
    this.matchChange$.next(match);
  }

  findMatch(id: number): Observable<Match> {
    return this.storageService.findMatch(id);
  }

}

function advanceMatchScore(match: Match, pontuador: PlayerMatch, otherPlayer: PlayerMatch) {
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

function advanceSetScore(set: MatchSet, pontuador: PlayerMatch, otherPlayer: PlayerMatch) {
  advanceScore(set, pontuador, otherPlayer, 6);
}

function advanceGameScoreTiebreakPoint(game: MatchGame, pontuador: PlayerMatch, otherPlayer: PlayerMatch, maxTieBreakPoints: number): void {
  advanceScore(game, pontuador, otherPlayer, maxTieBreakPoints);
}

function advanceScore(gameOrSet: MatchSet | MatchGame, pontuador: PlayerMatch, otherPlayer: PlayerMatch, maxPoints: number) {
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

function advanceGameScoreNormalPoint(game: MatchGame, pontuador: PlayerMatch, otherPlayer: PlayerMatch): void {
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

function getOtherPlayer(player: PlayerMatch): PlayerMatch {
  return player === 1 ? 0 : 1;
}

