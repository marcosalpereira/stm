import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { MatchViewComponent } from './components/match/match-view.component';
import { MatchesComponent } from './components/match/matches.component';
import { MatchControlComponent } from './components/match/match-control.component';
import { MatchEventsComponent } from './components/match/match-events.component';
import { MatchScoreComponent } from './components/match/match-score.component';
import { ButtonModule } from 'primeng/button';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { SetScoreComponent } from './components/match/set-score.component';
import { GameScorePipe } from './pipes/match/game-score.pipe';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'matches', component: MatchesComponent },
  { path: 'matches/:id/control', component: MatchControlComponent },
  { path: 'matches/:id', component: MatchViewComponent },
  { path: '', redirectTo: 'matches', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    MatchControlComponent,
    MatchViewComponent,
    MatchViewComponent,
    MatchesComponent,
    MatchEventsComponent,
    MatchScoreComponent,
    SetScoreComponent,
    GameScorePipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    PanelModule,
    ButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
