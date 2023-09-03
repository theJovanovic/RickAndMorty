import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CharacterActions from '../actions/character.actions';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

@Injectable()
export class CharacterEffects {
  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      mergeMap(() => this.apiService.getCharacters().pipe(
        map(data => CharacterActions.loadCharactersSuccess({ data })),
        catchError(error => of(CharacterActions.loadCharactersFailure({ error })))
      ))
    )
  );

  constructor(private actions$: Actions, private apiService: RickMortyApiService) {}
}
