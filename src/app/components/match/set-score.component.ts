import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatchSet, PlayerMatch, MatchGame } from 'src/app/model/match';

@Component({
  selector: 'tsm-set-score',
  templateUrl: './set-score.component.html',
  styleUrls: ['./set-score.component.css']
})
export class SetScoreComponent implements OnInit, OnChanges {

  @Input()
  set: MatchSet;

  @Input()
  player: PlayerMatch;

  lastGame: MatchGame;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastGame = this.set.games[this.set.games.length - 1];
  }

}
