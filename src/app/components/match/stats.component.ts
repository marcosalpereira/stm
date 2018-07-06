import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match, MatchEvent, Stat } from 'src/app/model/match';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'tsm-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnChanges {

  // private matchChangeSub: Subscription;
  @Input() match: Match;
  statsA: Stat[]
  statsB: Stat[]
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // console.log('stats-init')
    // this.matchChangeSub = this.dataService.matchChange$.subscribe(
    //   match => {
    //     console.log('match-stats', match)
    //     this.match = match;
    //   }
    // );
  }

  ngOnChanges(changes: SimpleChanges) {
    const match_changes = changes['match'];
    console.log(match_changes)
    if (match_changes) {
      this.match = match_changes.currentValue;
      this.statsA = this.doStats(this.match, Match.PLAYER_A);
      this.statsB = this.doStats(this.match, Match.PLAYER_B);
    }
  }

  // ngOnDestroy() {
  //   console.log('stats-destroy')
  //   this.matchChangeSub.unsubscribe();
  // }



  doStats(match, player): Stat[] {
    const tmpMap = this.match.events
      .filter((e: MatchEvent) => e.player === player)
      .reduce(function (map, matchEvent: MatchEvent) {
        const key = matchEvent.event
        let stat: Stat = map[key];
        if (!stat) {
          stat = new Stat(key, 1);
          map[key] = stat;
        } else {
          stat.value++;
        }
        return map;
      }, new Map());

    const items = Object.keys(tmpMap).map(key => tmpMap[key]);
    items.sort((left: Stat, right: Stat) =>
      right.event.localeCompare(left.event)
    );

    return items;
  }
}