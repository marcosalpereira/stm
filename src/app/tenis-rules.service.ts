import { Injectable } from '@angular/core';
import { Match, MatchSet, MatchGame, PlayerNumber } from 'src/app/model/match';

@Injectable({
  providedIn: 'root'
})
export class TenisRulesService {

  constructor() { }

  advanceMatchScore(match: Match, pontuador: PlayerNumber, otherPlayer: PlayerNumber) {
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
  
  advanceSetScore(set: MatchSet, pontuador: PlayerNumber, otherPlayer: PlayerNumber) {
    this.advanceScore(set, pontuador, otherPlayer, 6);
  }
  
  advanceGameScoreTiebreakPoint(game: MatchGame, pontuador: PlayerNumber, otherPlayer: PlayerNumber, maxTieBreakPoints: number): void {
    this.advanceScore(game, pontuador, otherPlayer, maxTieBreakPoints);
  }
  
  advanceScore(gameOrSet: MatchSet | MatchGame, pontuador: PlayerNumber, otherPlayer: PlayerNumber, maxPoints: number) {
    gameOrSet.score[pontuador]++;
    if (gameOrSet.score[pontuador] >= maxPoints
      && (gameOrSet.score[pontuador] - gameOrSet.score[otherPlayer]) >= 2) {
      gameOrSet.finished = true;
    }
  }
  
  
  getMaxTieBreakPoints(match: Match): number {
    if (match.superTieBreakLastSet && match.sets.length === match.bestOf) {
      return 10;
    }
    return 7;
  }
  
  advanceGameScoreNormalPoint(game: MatchGame, pontuador: PlayerNumber, otherPlayer: PlayerNumber): void {
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
  
  getLastSet(match: Match): MatchSet {
    return match.sets[match.sets.length - 1];
  }
  
  getLastGame(match: Match, set: MatchSet): MatchGame {
    const game = set.games[set.games.length - 1];
    game.superTiebreak = this.isSuperTieBreak(match);
    game.tiebreak = game.superTiebreak || this.isTieBreak(set);
    return game;
  }
  
  isTieBreak(set: MatchSet): boolean {
    return (set.score[0] === 6 && set.score[1] === 6);
  }
  
  isSuperTieBreak(match: Match): boolean {
    return (match.sets.length == match.bestOf && match.score[0] === match.score[1]);
  }
  
  getOtherPlayer(player: PlayerNumber): PlayerNumber {
    return player === 1 ? 0 : 1;
  }

}
