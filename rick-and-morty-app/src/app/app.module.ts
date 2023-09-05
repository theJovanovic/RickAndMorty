import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterEffects } from './store/effects/character-list.effects';
import * as fromCharacter from './store/reducers/character-list.reducer';
import * as fromLocation from './store/reducers/location-list.reducer';
import * as fromEpisode from './store/reducers/episode-list.reducer';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { LocationEffects } from './store/effects/location-list.effects';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EpisodeEffects } from './store/effects/episode-list.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterDialogComponent } from './components/character-dialog/character-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CharacterListComponent,
    LocationListComponent,
    EpisodeListComponent,
    PaginationComponent,
    CharacterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot( // ovo su kljucevi reducera
      {
        character: fromCharacter.reducer,
        location: fromLocation.reducer,
        episode: fromEpisode.reducer
      }),
    EffectsModule.forRoot([
      CharacterEffects,
      LocationEffects,
      EpisodeEffects]),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
