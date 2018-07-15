import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Match } from 'src/app/model/match';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'tsm-match-control',
  templateUrl: './match-control.component.html',
  styleUrls: ['./match-control.component.css']
})
export class MatchControlComponent implements OnInit, OnDestroy {
  findSub: Subscription;
  match: Match;
  undo: string[] = [];
  controller: Player;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location) { }

  ngOnInit() {
    this.controller = this.dataService.getUser();

    const param = this.activeRoute.snapshot.paramMap;
    const id = +param.get('id');
    this.findSub = this.dataService.findMatch(id).pipe(first()).subscribe(match => {
        this.match = match;
        if (!match.controller) {
          this.setController(this.controller);
        }
      }
    );
  }

  ngOnDestroy() {
    this.findSub.unsubscribe();
  }

  setController(p: Player) {
    this.match.controller = p ? p : null;;
    this.dataService.persist(this.match);
  }

  goBack() {
    if (this.controller.name === this.match.controller.name) {
      this.setController(undefined);
    }
    this.location.back();
  }

  undoLastEvent() {
    this.match = JSON.parse(this.undo.pop());
    this.dataService.persist(this.match);
  }

  onEvent(matchEvent) {
    this.undo.push(JSON.stringify(this.match));
    this.dataService.matchEvent(this.match, matchEvent);
  }

}
