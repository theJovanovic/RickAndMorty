import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as CharacterListActions from '../actions/character.actions'
import { RickMortyApiService } from '../../services/rick-morty-api.service'
import { Character } from 'src/app/models/Character'

@Injectable()
export class CharacterEffects {

  constructor(
    private actions$: Actions, private apiService: RickMortyApiService) { }

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.loadCharacters), // efekat je ove akcije
      mergeMap((action) => this.apiService.getCharacters(action.page).pipe( // action nosi podatke o akciji
        map((data) => CharacterListActions.loadCharactersSuccess({ data: data.results as Character[] })), // data je odgovor poziva servisne funkcije
        catchError((error) => of(CharacterListActions.loadCharactersFailure({ error })))
      ))
    )
  )

  loadSpecificCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.loadSpecificCharacters), // efekat je ove akcije
      mergeMap((action) => this.apiService.getSpecificCharacters(action.characterIds).pipe( // action nosi podatke o akciji
        map((data) => CharacterListActions.loadSpecificCharactersSuccess({ data: data })), // data je odgovor poziva servisne funkcije
        catchError((error) => of(CharacterListActions.loadSpecificCharactersFailure({ error })))
      ))
    )
  )

}
