import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Match, Matches } from 'src/app/model/match';

@Component({
  selector: 'tsm-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Matches;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.listMatches().subscribe(matches => this.matches = matches);
  }

}
