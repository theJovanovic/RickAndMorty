import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterEffects } from './store/effects/character.effects';
import * as fromCharacter from './store/reducers/character.reducer';
import * as fromLocation from './store/reducers/location.reducer';
import * as fromEpisode from './store/reducers/episode.reducer';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { LocationEffects } from './store/effects/location.effects';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EpisodeEffects } from './store/effects/episode.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CharacterListComponent,
    LocationListComponent,
    EpisodeListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule, // basic import (must-have)
    AppRoutingModule, // for easy navigation between pages
    HttpClientModule, // for http communications
    StoreModule.forRoot(
      {
        character: fromCharacter.reducer,
        location: fromLocation.reducer,
        episode: fromEpisode.reducer
      }), // needed for store functionality
    EffectsModule.forRoot([
      CharacterEffects,
      LocationEffects,
      EpisodeEffects]), BrowserAnimationsModule, // needed for effects functionality
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
