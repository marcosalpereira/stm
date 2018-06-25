import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../model/match';

@Component({
  selector: 'stm-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css']
})
export class MatchScoreComponent implements OnInit {

  @Input() match: Match;

  constructor() { }

  ngOnInit() {
  }

}
