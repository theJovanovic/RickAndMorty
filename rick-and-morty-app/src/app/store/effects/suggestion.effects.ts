import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as suggestionActions from '../actions/suggestion.actions'
import { RickMortyApiService } from 'src/app/services/rick-morty-api.service';

@Injectable()
export class SuggestionEffects {

    constructor(
        private actions$: Actions,
        private authService: RickMortyApiService
    ) { }

    getAllSuggestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(suggestionActions.getAllSuggestion),
            switchMap(_ =>
                this.authService.getAllSuggestions().pipe(
                    map(response => suggestionActions.getAllSuggestionSuccess({ suggestions: response })),
                    catchError(error => of(suggestionActions.getAllSuggestionFailure({ error })))
                )
            )
        )
    );

    sendSuggestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(suggestionActions.sendSuggestion),
            switchMap(action =>
                this.authService.sendSuggestion(action.suggestion).pipe(
                    map(response => suggestionActions.sendSuggestionSuccess({ newSuggestions: response })),
                    catchError(error => of(suggestionActions.sendSuggestionFailure({ error })))
                )
            )
        )
    );
}