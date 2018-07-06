import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match, MatchEvent, Stat } from 'src/app/model/match';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'tsm-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private matchChangeSub: Subscription;
  @Input() match: Match;
  statsA: Stat[]
  statsB: Stat[]
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.matchChangeSub = this.dataService.matchChange$.subscribe(
      match => {
        this.match = match;
        this.statsA = doStats(match, Match.PLAYER_A);
        this.statsB = doStats(match, Match.PLAYER_B);
      }
    );
  }

  ngOnDestroy() {
    this.matchChangeSub.unsubscribe();
  }


}

function doStats(match, player): Stat[] {
  const tmpMap = this.match.events
    .filter((e:MatchEvent) => e.player === player)
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
      right.name.localeCompare(left.name)
    );

    return items;
}
