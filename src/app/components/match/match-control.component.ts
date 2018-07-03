import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { Championship } from '../../model/championship';

@Component({
  selector: 'tsm-match-control',
  templateUrl: './match-control.component.html',
  styleUrls: ['./match-control.component.css']
})
export class MatchControlComponent implements OnInit {

  match: Match;

  constructor() { }

  ngOnInit() {
    const champ = new Championship('ASES 2018.2');
    this.match =
      new Match('1', champ,
          new Player('Foo', Match.PLAYER_A),
          new Player('Bar', Match.PLAYER_B));
  }

}
