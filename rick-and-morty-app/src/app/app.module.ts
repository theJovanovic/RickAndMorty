import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CharacterListComponent } from './components/character-list/character-list.component'
import { HttpClientModule } from '@angular/common/http'
import { CharacterEffects } from './store/effects/character.effects'
import * as fromCharacter from './store/reducers/character.reducer'
import * as fromLocation from './store/reducers/location.reducer'
import * as fromEpisode from './store/reducers/episode.reducer'
import * as fromUser from './store/reducers/user.reducer'
import * as fromSuggestions from './store/reducers/suggestion.reducer'
import { NavbarComponent } from './components/navbar/navbar.component'
import { LocationListComponent } from './components/location-list/location-list.component'
import { EpisodeListComponent } from './components/episode-list/episode-list.component'
import { LocationEffects } from './store/effects/location.effects'
import { PaginationComponent } from './components/pagination/pagination.component'
import { EpisodeEffects } from './store/effects/episode.effects'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CharacterDialogComponent } from './components/character-dialog/character-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { EpisodeDialogComponent } from './components/episode-dialog/episode-dialog.component';
import { MemoryCardsComponent } from './components/memory-cards/memory-cards.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CharacterFilterComponent } from './components/character-filter/character-filter.component'
import { UserEffects } from './store/effects/user.effects';
import { RegistrationComponent } from './components/registration/registration.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SuggestionsDialogComponent } from './components/suggestions-dialog/suggestions-dialog.component'
import { SuggestionEffects } from './store/effects/suggestion.effects'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CharacterListComponent,
    LocationListComponent,
    EpisodeListComponent,
    PaginationComponent,
    CharacterDialogComponent,
    EpisodeDialogComponent,
    MemoryCardsComponent,
    PageNotFoundComponent,
    CharacterFilterComponent,
    RegistrationComponent,
    LoginComponent,
    SuggestionsDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    StoreModule.forRoot( // ovo su kljucevi reducera
      {
        character: fromCharacter.reducer,
        location: fromLocation.reducer,
        episode: fromEpisode.reducer,
        user: fromUser.reducer,
        suggestion: fromSuggestions.reducer
      }),
    EffectsModule.forRoot([
      CharacterEffects,
      LocationEffects,
      EpisodeEffects,
      UserEffects,
      SuggestionEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
