import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Player } from 'src/app/model/player';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'tsm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  listPlayersSub: Subscription;
  player: Player;
  players: Player[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.listPlayersSub = this.dataService.listPlayers().subscribe(players => this.players = players);
    this.player = this.dataService.getUser();

  }

  onSelected(player: Player) {
    if (player) {
      this.dataService.setUser(player);
      this.player = player;
    }
  }

  ngOnDestroy() {
    this.listPlayersSub.unsubscribe();
  }

}
