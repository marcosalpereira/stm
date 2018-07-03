import { Component, OnInit, Input } from '@angular/core';
import { MatchSet, PlayerMatch } from 'src/app/model/match';

@Component({
  selector: 'stm-set-score',
  templateUrl: './set-score.component.html',
  styleUrls: ['./set-score.component.css']
})
export class SetScoreComponent implements OnInit {

  @Input()
  set: MatchSet;

  @Input()
  player: PlayerMatch;

  constructor() { }

  ngOnInit() {
  }

}
