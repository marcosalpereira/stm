import { Pipe, PipeTransform } from '@angular/core';
import { MatchGame, PlayerNumber, Match } from '../../model/match';

@Pipe({
  name: 'gameScore',
  pure: false
})
export class GameScorePipe implements PipeTransform {

  transform(game: MatchGame, player: PlayerNumber): string {
    if (game.advantage === player) {
      return 'AD';
    }
    const score = game.score[player];
    return Match.GAME_SCORES[score] + '';
  }

}
