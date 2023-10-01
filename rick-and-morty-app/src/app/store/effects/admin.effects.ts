import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import * as AdminActions from '../actions/admin.actions'
import { RickMortyApiService } from '../../services/rick-morty-api.service'
import { Character } from 'src/app/models/Character'
import { UserData } from 'src/app/models/UserData'
import { Episode } from 'src/app/models/Episode'
import { Location } from 'src/app/models/Location'

@Injectable()
export class AdminEffects {

  constructor(
    private actions$: Actions, private apiService: RickMortyApiService) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadUsers),
      mergeMap((_) => this.apiService.getUsers().pipe(
        map((data) => AdminActions.loadUsersSuccess({ users: data as UserData[] })),
        catchError((error) => of(AdminActions.loadUsersFailure({ error })))
      ))
    )
  )

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteUser),
      mergeMap((action) => this.apiService.deleteUser(action.id).pipe(
        map((data) => AdminActions.deleteUserSuccess({ users: data as UserData[] })),
        catchError((error) => of(AdminActions.deleteUserFailure({ error })))
      ))
    )
  )

  modifyUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.modifyUser),
      mergeMap((action) => this.apiService.modifyUser(action.user).pipe(
        map((data) => AdminActions.modifyUserSuccess({ users: data as UserData[] })),
        catchError((error) => of(AdminActions.modifyUserFailure({ error })))
      ))
    )
  )

  deleteCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteCharacter),
      mergeMap((action) => this.apiService.deleteCharacter(action.characterId).pipe(
        map((data) => AdminActions.deleteCharacterSuccess({ data: data.results as Character[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError((error) => of(AdminActions.deleteCharacterFailure({ error })))
      ))
    )
  )

  deleteEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteEpisode),
      mergeMap((action) => this.apiService.deleteEpisode(action.episodeId).pipe(
        map((data) => AdminActions.deleteEpisodeSuccess({ data: data.results as Episode[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError((error) => of(AdminActions.deleteEpisodeFailure({ error })))
      ))
    )
  )

  deleteLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteLocation),
      mergeMap((action) => this.apiService.deleteLocation(action.locationId).pipe(
        map((data) => AdminActions.deleteLocationSuccess({ data: data.results as Location[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError((error) => of(AdminActions.deleteLocationFailure({ error })))
      ))
    )
  )

}
