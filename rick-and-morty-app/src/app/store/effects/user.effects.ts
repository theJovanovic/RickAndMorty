import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as userActions from '../actions/user.actions'
import { RickMortyApiService } from 'src/app/services/rick-morty-api.service';
import { UserData } from 'src/app/models/UserData';
import { UserRole } from 'src/app/models/User';

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
                    map(response => {
                        const { id, firstname, lastname, email, token } = response as { id: number, firstname: string, lastname: string, email: string, token: string };
                        return userActions.registerUserSuccess({ id, firstname, lastname, email, token });
                    }),
                    catchError(error => of(userActions.registerUserFailure({ error })))
                )
            )
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.loginUser),
            switchMap(action =>
                this.authService.login(action.user).pipe(
                    map(response => {
                        const { id, firstname, lastname, email, role, token } = response as { id: number, firstname: string, lastname: string, email: string, role: UserRole, token: string };;
                        return userActions.loginUserSuccess({ id, firstname, lastname, email, role, token });
                    }),
                    catchError(error => of(userActions.loginUserFailure({ error })))
                )
            )
        )
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.logoutUser),
            switchMap(action =>
                this.authService.logout(action.id).pipe(
                    map(_ => userActions.logoutUserSuccess()),
                    catchError(error => of(userActions.logoutUserFailure({ error })))
                )
            )
        )
    );

    setToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.setToken),
            map(action => userActions.setTokenSuccess({ token: action.token }))
        )
    );

}
