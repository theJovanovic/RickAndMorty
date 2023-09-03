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

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ character: fromCharacter.reducer }),
    EffectsModule.forRoot([CharacterEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
