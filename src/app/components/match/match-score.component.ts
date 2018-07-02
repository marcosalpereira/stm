import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Match } from 'src/app/model/match';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stm-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css']
})
export class MatchScoreComponent implements OnInit, OnDestroy {

  private matchChangeSub: Subscription;
  @Input() match: Match;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.matchChangeSub = this.dataService.matchChange$.subscribe(
      match => this.match = match
    );
  }

  ngOnDestroy() {
    this.matchChangeSub.unsubscribe();
  }

}
