import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Match, MatchGame, MatchSet } from 'src/app/model/match';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tsm-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css']
})
export class MatchScoreComponent {

  @Input() match: Match;


  lastGame(set: MatchSet): MatchGame {
    return set.games[set.games.length - 1];
  }

}
