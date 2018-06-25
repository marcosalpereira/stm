import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'stm-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.css']
})
export class MatchEventsComponent implements OnInit {

  @Input() match: Match;
  @Input() player: Player;

  constructor() { }

  ngOnInit() {
  }

}
