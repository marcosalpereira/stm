import { Component, OnInit } from '@angular/core';
import { Match } from '../../model/match';
import { Championship } from 'src/app/model/championship';
import { Player } from 'src/app/model/player';
import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tsm-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  match: Match;
  listPlayersSub: Subscription;
  players: Player[] = [];

  constructor(private location: Location, private dataService: DataService) { }

  ngOnDestroy() {
    this.listPlayersSub.unsubscribe();
  }

  ngOnInit() {
    this.listPlayersSub = this.dataService.listPlayers().subscribe(players => this.players = players);

    const champ = new Championship('');
    this.match =
      new Match(champ,
        undefined,
        undefined);
  }

  onSubmit() {
    this.dataService.persist(this.match);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  onSelectedA(player: Player) {
    this.match.playerA = player;
  }
  onSelectedB(player: Player) {
    this.match.playerB = player;
  }

}
