import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'tsm-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent {
  @Input() match: Match;
}

