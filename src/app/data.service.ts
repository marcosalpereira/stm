import { Injectable } from '@angular/core';
import { MatchSet, Match, PlayerMatch, MatchEvent, MatchGame } from './model/match';
import { Player } from './model/player';
import { StorageService } from 'src/app/storage.service';
import { Subject } from 'rxjs';

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

    const set = getLastSet(match);
    const game = getLastGame(set);

    if (game.tiebreak) {
      advanceGameScoreTiebreakPoint(game, pontuador, otherPlayer, getMaxTieBreakPoints(match));
    } else {
      advanceGameScoreNormalPoint(game, pontuador, otherPlayer);
    }

    if (game.finished) {
      advanceSetScore(set, pontuador, otherPlayer);
      if (set.finished) {
        advanceMatchScore(match, pontuador, otherPlayer);
        if (match.finished) {
          match.endDate = new Date();
          match.winner = pontuador;
        } else {
          match.sets.push(new MatchSet(match.sets.length + 1));
        }
      } else {
        set.games.push(new MatchGame(set.games.length + 1, getOtherPlayer(game.serving)));
      }
    }

    this.storageService.persist(match);
    this.matchChange$.next(match);
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
    && (gameOrSet.score[pontuador] - gameOrSet.score[otherPlayer]) === 2) {
    gameOrSet.finished = true;
  }
}


function getMaxTieBreakPoints(match: Match): number {
  if (match.superTieBreak && match.sets.length === match.bestOf) {
    return 10;
  }
  return 7;
}

function advanceGameScoreNormalPoint(game: MatchGame, pontuador: PlayerMatch, otherPlayer: PlayerMatch): void {
  if (game.score[pontuador] !== 3) {
    game.score[pontuador]++;

  } else {
    if (game.advantage === pontuador) {
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

function getLastGame(set: MatchSet): MatchGame {
  return set.games[set.games.length - 1];
}

function isTieBreak(match: Match) {
  const set = getLastSet(match);
  return set.score[0] === 6
      && set.score[1] === 6;
}

function getOtherPlayer(player: PlayerMatch): PlayerMatch {
  return player === 1 ? 0 : 1;
}

