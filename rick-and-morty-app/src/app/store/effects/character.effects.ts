import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as CharacterActions from '../actions/character.actions'
import { RickMortyApiService } from '../../services/rick-morty-api.service'
import { Character } from 'src/app/models/Character'

@Injectable()
export class CharacterEffects {

  constructor(
    private actions$: Actions, private apiService: RickMortyApiService) { }

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      mergeMap((action) => this.apiService.getCharacters(action.query).pipe(
        map((data) => CharacterActions.loadCharactersSuccess({ data: data.results as Character[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError((error) => of(CharacterActions.loadCharactersFailure({ error })))
      ))
    )
  )

  loadSpecificCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadSpecificCharacters),
      mergeMap((action) => this.apiService.getSpecificCharacters(action.characterIds).pipe(
        map((data) => CharacterActions.loadSpecificCharactersSuccess({ data: data })),
        catchError((error) => of(CharacterActions.loadSpecificCharactersFailure({ error })))
      ))
    )
  )

  createCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.createCharacter),
      mergeMap((action) => this.apiService.createCharacter(action.character).pipe(
        map((data) => CharacterActions.createCharacterSuccess({ data: data.results as Character[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError((error) => of(CharacterActions.createCharacterFailure({ error })))
      ))
    )
  )

}
