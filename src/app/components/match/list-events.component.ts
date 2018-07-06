import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'tsm-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

  private matchChangeSub: Subscription;
  @Input() match: Match;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.matchChangeSub = this.dataService.matchChange$.subscribe(
      match => {
        this.match = match;
        console.log('e', match.events);
      }
    );
  }

  ngOnDestroy() {
    this.matchChangeSub.unsubscribe();
  }
}

