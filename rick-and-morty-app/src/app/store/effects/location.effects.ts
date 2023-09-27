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

  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadCharts),
      mergeMap(_ => this.apiService.getCharts().pipe(
        map((data) => LocationActions.loadChartsSuccess({ charactersChart: data.charactersChart, episodesChart: data.episodesChart, pieChart: data.pieChart })),
        catchError((error) => of(LocationActions.loadChartsFailure({ error })))
      ))
    )
  )

  loadLocationPiechart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocationPieChart),
      mergeMap(action => this.apiService.getLocationPiechart(action.location_id).pipe(
        map((data) => LocationActions.loadLocationPieChartSuccess({ locationPieChart: data.locationPieChart })),
        catchError((error) => of(LocationActions.loadLocationPieChartFailure({ error })))
      ))
    )
  )
}
