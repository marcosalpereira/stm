import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { EventType } from './match-events.component';

@Component({
  selector: 'stm-match-control',
  templateUrl: './match-control.component.html',
  styleUrls: ['./match-control.component.css']
})
export class MatchControlComponent implements OnInit {

  match: Match;

  constructor() { }

  ngOnInit() {
    this.match = new Match(new Player('Foo'), new Player('Bar'));
    console.log(this.match);
  }

  onEvent(event: EventType, player: Player) {
    
  }
}
