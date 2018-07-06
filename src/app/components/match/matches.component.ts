import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Matches } from 'src/app/model/match';

@Component({
  selector: 'tsm-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Matches;
  listSub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.listSub = this.dataService.listMatches().subscribe(matches => this.matches = matches);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
