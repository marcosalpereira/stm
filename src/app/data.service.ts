import { Injectable } from '@angular/core';
import { MatchSet, Match, PlayerMatch, MatchEvent } from './model/match';
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

    if (event.event === 'ace' || event.event === 'wbh' || event.event === 'wfh') {
      pontuador = event.player;
    } else {
      pontuador = getOtherPlayer(event.player);
    }

    let gameFinished: boolean;
    if (isTieBreak(match)) {
      gameFinished = advanceScoreTiebreakPoint(match, pontuador, event);
    } else {
      gameFinished = advanceScoreNormalPoint(match, pontuador, event);
    }

    if (gameFinished) {
      if (match.sets.length === match.bestOf) {
        match.endDate = new Date();
      } else {
        match.sets.push(new MatchSet(match.sets.length + 1));
      }
    }

    this.storageService.persist(match);
    this.matchChange$.next(match);
  }
}

function advanceScoreTiebreakPoint(match, pontuador: number, event: MatchEvent): boolean {
  let gameFinished = false;
  const set: MatchSet = getLastSet(match);
  const otherPlayer = getOtherPlayer(event.player);
  set.gameScore[pontuador]++;
  if (set.gameScore[pontuador] >= getMaxTieBreakPoint(match)
      && (set.gameScore[pontuador] - set.gameScore[otherPlayer]) === 2) {
      set.setScore[pontuador]++;
      gameFinished = true;
  }
  return gameFinished;
}

function getMaxTieBreakPoint(match: Match): number {
  if (match.superTieBreak && match.sets.length === match.bestOf) {
    return 10;
  }
  return 7;
}

function advanceScoreNormalPoint(match: Match, pontuador: PlayerMatch, event: MatchEvent): boolean {
  let gameFinished =  false;
  const set: MatchSet = getLastSet(match);
  const otherPlayer = getOtherPlayer(event.player);
  if (set.gameScore[pontuador] === 3) {
    if (set.advantage === pontuador) {
      set.setScore[pontuador]++;
      gameFinished = true;
    }
    else if (set.advantage === otherPlayer) {
      set.advantage = undefined;
    }
    else {
      set.advantage = pontuador;
    }
  }
  else {
    set.gameScore[pontuador]++;
  }
  return gameFinished;
}

function getLastSet(match: Match): MatchSet {
  return match.sets[match.sets.length - 1];
}

function isTieBreak(match: Match) {
  const set = getLastSet(match);
  return set.setScore[0] === 6
      && set.setScore[1] === 6;
}

function getOtherPlayer(player: PlayerMatch): PlayerMatch {
  return player === 1 ? 0 : 1;
}

