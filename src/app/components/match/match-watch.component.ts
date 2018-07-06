import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/model/match';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'tsm-match-watch',
  templateUrl: './match-watch.component.html',
  styleUrls: ['./match-watch.component.css']
})
export class MatchWatchComponent implements OnInit, OnDestroy {

  match: Match;
  findSub: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location) { }

  ngOnInit() {
    const param = this.activeRoute.snapshot.paramMap;
    const id = +param.get('id');
    this.findSub = this.dataService.findMatch(id).subscribe(match => {
      this.match = match;
    });
  }

  ngOnDestroy() {
    this.findSub.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

}
