import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { DataService } from '../../data.service';

@Component({
  selector: 'tsm-player-select',
  templateUrl: './player-select.component.html',
  styleUrls: ['./player-select.component.css']
})
export class PlayerSelectComponent implements OnInit {
  @Input() players: Player[];
  @Input() player: Player;
  @Input() label: string;
  @Input() title = "Jogador";
  @Output() selected = new EventEmitter<Player>();
  showNewPlayer = false;
  playerName: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  confirmar() {
    if (!this.players) {
      this.players = [];
    }
    const index = this.players.findIndex(p => p.name === this.playerName);
    if (index === -1) {
      const p = new Player(this.playerName);
      this.players.push(p);
      this.players = this.players.slice();
      this.dataService.persistPlayers(this.players);
      this.showNewPlayer = false;
      this.selected.emit(p)
      this.playerName = undefined;
    }
  }

  onChange(e) {
    this.selected.emit(e.value);
  }

  onClick() {

  }

}
