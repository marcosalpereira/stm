import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { Championship } from '../../model/championship';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'tsm-match-control',
  templateUrl: './match-control.component.html',
  styleUrls: ['./match-control.component.css']
})
export class MatchControlComponent implements OnInit {

  match: Match;
  matchLocked: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location) { }

  ngOnInit() {
    const param = this.activeRoute.snapshot.paramMap;
    const id = +param.get('id');
    this.dataService.findMatch(id).pipe(first()).subscribe(match => {
        this.match = match;

        this.matchLocked = match.locked;
        this.setLockStatus(true);
      }
    );
  }

  setLockStatus(locked: boolean) {
    this.match.locked = locked;
    this.dataService.persist(this.match);
  }

  goBack() {
    this.setLockStatus(false);
    this.location.back();
  }

}
