import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match, EventType } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { DataService } from '../../data.service';

@Component({
  selector: 'stm-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.css']
})
export class MatchEventsComponent implements OnInit {

  @Input() match: Match;
  @Input() player: Player;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onClick(evento: EventType) {
    this.dataService.matchEvent(this.match, this.player, evento);
  }

}
