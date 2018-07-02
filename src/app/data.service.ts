import { Injectable } from '@angular/core';
import { Match, PlayerMatch, MatchEvent } from './model/match';
import { Player } from './model/player';
import { EventType } from './components/match/match-events.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  matchEvent(match: Match, event: MatchEvent): void {
    const set = match.sets[match.sets.length - 1];
    let pontuador: PlayerMatch;
    const otherPlayer = getOtherPlayer(event.player);
    if (event.event === 'ace' || event.event === 'wbh' || event.event === 'wfh') {
      pontuador = event.player;
    } else {
      pontuador = otherPlayer;
    }

    if (isTieBreak(match)) {

    }

    if (set.gameScore[pontuador] === 3) {
      if (set.advantage === pontuador) {
        set.setScore[event.player]++;

      } else if (set.advantage === otherPlayer) {
        set.advantage = undefined;

      } else {
        set.advantage = pontuador;
      }
    } else {
      set.gameScore[event.player]++;
    }


  }
}

function isTieBreak(match: Match) {

}

function getOtherPlayer(player: PlayerMatch): PlayerMatch {
  return player === 1 ? 0 : 1;
}

