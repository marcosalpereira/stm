import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Match } from 'src/app/model/match';

@Component({
  selector: 'tsm-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Observable<Match[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.matches = this.dataService.listMatches();
  }

}
