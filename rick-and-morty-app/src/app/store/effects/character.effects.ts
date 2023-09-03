import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CharacterActions from '../actions/character.actions';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

@Injectable()
export class CharacterEffects {

  constructor(private actions$: Actions, private apiService: RickMortyApiService) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters), // pristupa funkcijama iz actions fajlas
      mergeMap((action) => this.apiService.getCharacters(action.page).pipe(
        map(data => CharacterActions.loadCharactersSuccess({ data })), // pristupa funkcijama iz actions fajlas
        catchError(error => of(CharacterActions.loadCharactersFailure({ error }))) // pristupa funkcijama iz actions fajlas
      ))
    )
  );
}
