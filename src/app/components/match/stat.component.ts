import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../model/player';
import { Stat } from 'src/app/model/match';

@Component({
  selector: 'tsm-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  @Input() player: Player;
  @Input() stats: Stat[];

  constructor() { }

  ngOnInit() {
  }

}
