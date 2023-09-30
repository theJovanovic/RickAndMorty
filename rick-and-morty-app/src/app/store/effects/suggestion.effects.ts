import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as suggestionActions from '../actions/suggestion.actions'
import { RickMortyApiService } from 'src/app/services/rick-morty-api.service';
import { Suggestion } from 'src/app/models/Suggestion';
import { ReceivedSuggestion } from 'src/app/models/ReceivedSuggestion';

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
                    map(response => suggestionActions.getAllSuggestionSuccess({ suggestions: response as ReceivedSuggestion[] })),
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
                    map(response => suggestionActions.sendSuggestionSuccess({ newSuggestions: response as ReceivedSuggestion[] })),
                    catchError(error => of(suggestionActions.sendSuggestionFailure({ error })))
                )
            )
        )
    );

    setSuggestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(suggestionActions.setSuggestion),
            map(action => suggestionActions.setSuggestionSuccess({ suggestion: action.suggestion })),
            catchError(error => of(suggestionActions.setSuggestionFailure({ error })))
        )
    );

    addApprove$ = createEffect(() =>
        this.actions$.pipe(
            ofType(suggestionActions.addApprove),
            switchMap(action =>
                this.authService.addSuggestionApprove(action.id, action.userId).pipe(
                    map(response => suggestionActions.addApproveSuccess({ suggestions: response as ReceivedSuggestion[] })),
                    catchError(error => of(suggestionActions.addApproveFailure({ error })))
                )
            )
        )
    );
}