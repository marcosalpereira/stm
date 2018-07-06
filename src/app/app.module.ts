import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckboxModule } from 'primeng/checkbox';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'

import { Routes, RouterModule } from '@angular/router';

import { PanelModule } from 'primeng/panel';
import { MatchWatchComponent } from './components/match/match-watch.component';
import { MatchesComponent } from './components/match/matches.component';
import { MatchControlComponent } from './components/match/match-control.component';
import { MatchEventsComponent } from './components/match/match-events.component';
import { MatchScoreComponent } from './components/match/match-score.component';
import { ButtonModule } from 'primeng/button';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { SetScoreComponent } from './components/match/set-score.component';
import { GameScorePipe } from './pipes/match/game-score.pipe';
import { CommonModule } from '@angular/common';
import { MatchEditComponent } from './components/match/match-edit.component';
import { SpinnerModule } from 'primeng/spinner';
import { ListEventsComponent } from './components/match/list-events.component';
import { StatsComponent } from './components/match/stats.component';
import { StatComponent } from './components/match/stat.component';
import { EventPipe } from './pipes/match/event.pipe';
import { PlayerPipe } from './pipes/match/player.pipe';
import { LastEventsPipe } from './pipes/last-events.pipe';

const routes: Routes = [
  { path: 'matches', component: MatchesComponent },
  { path: 'matches/:id/control', component: MatchControlComponent },
  { path: 'matches/new', component: MatchEditComponent },
  { path: 'matches/:id', component: MatchWatchComponent },
  { path: '', redirectTo: 'matches', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    MatchControlComponent,
    MatchWatchComponent,
    MatchWatchComponent,
    MatchesComponent,
    MatchEventsComponent,
    MatchScoreComponent,
    SetScoreComponent,
    GameScorePipe,
    MatchEditComponent,
    ListEventsComponent,
    StatsComponent,
    StatComponent,
    EventPipe, PlayerPipe, LastEventsPipe
  ],
  imports: [
    CommonModule, CheckboxModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    PanelModule,
    ButtonModule, SpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
