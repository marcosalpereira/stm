import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Match, Matches } from 'src/app/model/match';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Player } from 'src/app/model/player';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private matchesRef: AngularFireObject<Matches>;
  private playersRef: AngularFireObject<Player[]>;
  // private matchRef: AngularFireObject<Match>;
  // private match: Observable<Match>;
  // private matchesRef: AngularFireList<Match>;

  constructor(private db: AngularFireDatabase) {
    // this.matchesRef = db.list('matches');
    this.matchesRef = db.object('matches');
    this.playersRef =  db.object(`players`);
    // this.match = this.matchRef.valueChanges();
  }

  getMatches(): Observable<Matches> {
    return this.matchesRef.valueChanges();
  }

  private addMatch(match: Match) {
    this.getMatches().pipe(first()).subscribe(matches => {
      if (!matches) {
        matches = new Matches();
      }
      matches.list.push({'matchId': match.id, 'champName': match.championship.name, 'matchName': getMatchName(match)});
      this.matchesRef.set(matches);
    });
  }

  getPlayers(): Observable<Player[]> {
    return this.playersRef.valueChanges();
  }

  persistPlayers(players: Player[]) {
    const playersRef = this.db.object(`players`);
    playersRef.set(players);
  }

  persistMatch(match: Match): void {
    let newId: number;
    if (!match.id) {
      match.id = new Date().getTime();
      this.addMatch(match);
    }
    const matchRef = this.db.object(`match-${match.id}`);
    match.startDate = match.startDate.toString();
    if (match.endDate) {
      match.endDate = match.endDate.toString();
    }
    matchRef.set(match);
  }

  findMatch(id: number): Observable<Match> {
    const matchRef: AngularFireObject<Match> = this.db.object(`match-${id}`)
    return matchRef.valueChanges();
  }
}

function getMatchName(match: Match): string {
  return `${match.playerA.name} x ${match.playerB.name}`;
}
