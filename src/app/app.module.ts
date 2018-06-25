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
import {ButtonModule} from 'primeng/button';

const routes: Routes = [
  { path: 'matches', component: MatchesComponent },
  { path: 'match-control', component: MatchControlComponent},
  { path: '', redirectTo: 'match-control', pathMatch: 'full' }
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    PanelModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
