import { Pipe, PipeTransform } from '@angular/core';
import { MatchEvent, Match, EventType, PlayerNumber } from '../../model/match';

@Pipe({
  name: 'player'
})
export class PlayerPipe implements PipeTransform {

  transform(player: PlayerNumber, match: Match): string {
    let playerName: string;
    if (player === Match.PLAYER_A) {
      playerName = match.playerA.name;
    } else {
      playerName = match.playerB.name;
    }
    return playerName;
  }
}
