import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'stm-match-control',
  templateUrl: './match-control.component.html',
  styleUrls: ['./match-control.component.css']
})
export class MatchControlComponent implements OnInit {

  match: Match;

  constructor() { }

  ngOnInit() {
    this.match =
      new Match(
          new Player('Foo', Match.PLAYER_A),
          new Player('Bar', Match.PLAYER_B));
    console.log(this.match);
  }

}
