import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as userActions from '../actions/user.actions'
import { RickMortyApiService } from 'src/app/services/rick-morty-api.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private authService: RickMortyApiService
    ) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.registerUser),
            switchMap(action =>
                this.authService.register(action.user).pipe(
                    map(token => token.token),
                    map(token => userActions.registerUserSuccess({ token })),
                    catchError(error => [userActions.registerUserFailure({ error })])
                )
            )
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.loginUser),
            switchMap(action =>
                this.authService.login(action.user).pipe(
                    map(token => token.token),
                    map(token => userActions.loginUserSuccess({ token })),
                    catchError(error => [userActions.loginUserFailure({ error })])
                )
            )
        )
    );


}
