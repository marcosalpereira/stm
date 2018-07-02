import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Match } from 'src/app/model/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private itemRef: AngularFireObject<any>;
  private item: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('match');
    this.item = this.itemRef.valueChanges();
  }

  persist(match: Match): void {
    this.itemRef.set(match);
  }
}
