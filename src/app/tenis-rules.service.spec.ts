import { TestBed, inject } from '@angular/core/testing';

import { TenisRulesService } from './tenis-rules.service';
import { MatchGame, Match } from './model/match';

describe('TenisRulesService', () => {
  let tenisRules: TenisRulesService;
  beforeEach(() => { tenisRules = new TenisRulesService(); });

  it('Normal: 40x15 -> game finished', () => {
    const lastGame = createGame(Match.GS_40, Match.GS_15);
    const pontuador = Match.PLAYER_A;
    const otherPlayer = Match.PLAYER_B;
    tenisRules.advanceGameScoreNormalPoint(lastGame, pontuador, otherPlayer);
    console.log(lastGame);
    expect(lastGame.finished).toBe(true);
  });

});

function createGame(scoreA: number, scoreB: number): MatchGame {
  const game = new MatchGame(1);
  game.score = [scoreA, scoreB];
  return game;
}
