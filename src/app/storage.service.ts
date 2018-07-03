import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Match } from 'src/app/model/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private matchRef: AngularFireObject<Match>;
  private match: Observable<Match>;
  private matchesRef: AngularFireList<Match>;

  constructor(private db: AngularFireDatabase) {
    this.matchesRef = db.list('matches');
    // this.matchRef = db.object('match');
    // this.match = this.matchRef.valueChanges();
  }

  list(): Observable<Match[]> {
    return this.matchesRef.valueChanges();
  }

  persist(match: Match): void {
    this.matchRef.set(match);
  }
}
