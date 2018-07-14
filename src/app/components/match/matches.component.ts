import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Matches } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { Championship } from '../../model/championship';

@Component({
  selector: 'tsm-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy, OnChanges {
  matches: Matches;
  listMatchesSub: Subscription;
  listPlayersSub: Subscription;
  player = new Player('');
  players: Player[] = [];

  champsName: string[]

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.listMatchesSub = this.dataService.listMatches()
      .subscribe(matches => {
        this.matches = matches;
        this.champsName = Array.from(new Set(this.matches.list.map(m => m.champName)));
      });
    this.listPlayersSub = this.dataService.listPlayers().subscribe(players => this.players = players);
    this.player = this.dataService.getUser();

  }

  ngOnChanges(changes: SimpleChanges) {
    const playerChange = changes['player'];
    if (playerChange) {
      this.dataService.setUser(playerChange.currentValue);
      this.player = playerChange.currentValue;
    }
  }

  ngOnDestroy() {
    this.listMatchesSub.unsubscribe();
    this.listPlayersSub.unsubscribe();
  }

}
