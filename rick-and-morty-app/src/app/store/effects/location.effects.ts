import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as LocationActions from '../actions/location.actions'
import { RickMortyApiService } from '../../services/rick-morty-api.service'
import { Location } from 'src/app/models/Location'

@Injectable()
export class LocationEffects {

  constructor(private actions$: Actions, private apiService: RickMortyApiService) { }

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocations),
      mergeMap((action) => this.apiService.getLocations(action.query).pipe(
        map((data) => LocationActions.loadLocationsSuccess({ data: data.results as Location[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError((error) => of(LocationActions.loadLocationsFailure({ error })))
      ))
    )
  )
}
