import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as LocationActions from '../actions/location.actions';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

@Injectable()
export class LocationEffects {

  constructor(private actions$: Actions, private apiService: RickMortyApiService) {}

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocations), // pristupa funkcijama iz actions fajlas
      mergeMap((action) => this.apiService.getLocations(action.page).pipe(
        map(data => LocationActions.loadLocationsSuccess({ data })), // pristupa funkcijama iz actions fajlas
        catchError(error => of(LocationActions.loadLocationsFailure({ error }))) // pristupa funkcijama iz actions fajlas
      ))
    )
  );
}
