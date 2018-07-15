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
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Matches;
  listMatchesSub: Subscription;
  user: Player;

  champsName: string[]
  userChangeSub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.listMatchesSub = this.dataService.listMatches()
      .subscribe(matches => {
        this.matches = matches;
        if (matches) {
          this.champsName = Array.from(new Set(this.matches.list.map(m => m.champName)));
        }
      });
    this.user = this.dataService.getUser();
    this.userChangeSub = this.dataService.userChange$.subscribe(u => this.user = u);
  }

  ngOnDestroy() {
    this.listMatchesSub.unsubscribe();
    this.userChangeSub.unsubscribe();
  }

}
