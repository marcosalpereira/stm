import { Pipe, PipeTransform } from '@angular/core';
import { MatchGame, PlayerMatch } from '../../model/match';

@Pipe({
  name: 'gameScore'
})
export class GameScorePipe implements PipeTransform {

  transform(game: MatchGame, player: PlayerMatch): string {
    if (game.advantage === player) {
      return 'AD';
    }
    return ['0', '15', '30', '40'][game.score[player]];
  }

}
