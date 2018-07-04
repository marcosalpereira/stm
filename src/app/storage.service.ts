import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Match, Matches } from 'src/app/model/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private matchesRef: AngularFireObject<Matches>;
  // private matchRef: AngularFireObject<Match>;
  // private match: Observable<Match>;
  // private matchesRef: AngularFireList<Match>;

  constructor(private db: AngularFireDatabase) {
    // this.matchesRef = db.list('matches');
    this.matchesRef = db.object('matches');
    // this.match = this.matchRef.valueChanges();
  }

  getMatches(): Observable<Matches> {
    return this.matchesRef.valueChanges();
  }

  persistMatches(matches: Matches) {
    this.matchesRef.set(matches);
  }

  persist(match: Match): void {
    match.id = new Date().getTime();
    this.matchesRef.push(match);
  }

  findMatch(id: number): Observable<Match> {
    return this.matchesRef.query.equalTo(id, 'id').once(;
  }
}
