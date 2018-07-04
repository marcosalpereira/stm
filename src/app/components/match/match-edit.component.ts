import { Component, OnInit } from '@angular/core';
import { Match } from '../../model/match';
import { Championship } from 'src/app/model/championship';
import { Player } from 'src/app/model/player';
import { Location } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  selector: 'tsm-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  match: Match;

  constructor(private location: Location, private dataService: DataService) { }

  ngOnInit() {
    const champ = new Championship('');
    this.match =
      new Match(champ,
          new Player('', Match.PLAYER_A),
          new Player('', Match.PLAYER_B));
  }

  onSubmit() {
    this.dataService.persist(this.match);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}
