import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match, EventType, MatchEvent, PlayerMatch, PlayerNumber } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { DataService } from '../../data.service';

@Component({
  selector: 'tsm-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.css']
})
export class MatchEventsComponent implements OnInit {

  @Input() match: Match;
  @Input() playerNumber: PlayerNumber;
  @Output() event = new EventEmitter<MatchEvent>();

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  onClick(evento: EventType) {
    const matchEvent = {
      player: this.playerNumber, event: evento
    };
    this.event.emit(matchEvent);
  }

}
