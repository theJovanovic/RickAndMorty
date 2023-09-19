import { createAction, props } from '@ngrx/store';
import { LoginUser } from 'src/app/models/LoginUser';
import { User } from 'src/app/models/User';

export const registerUser = createAction('[User] Register User', props<{ user: User }>());
export const registerUserSuccess = createAction('[User] Register User Success', props<{ id: number, firstname: string, lastname: string, email: string, token: string }>());
export const registerUserFailure = createAction('[User] Register User Failure', props<{ error: Error }>());

export const loginUser = createAction('[User] Login User', props<{ user: LoginUser }>());
export const loginUserSuccess = createAction('[User] Login User Success', props<{ id: number, firstname: string, lastname: string, email: string, token: string }>());
export const loginUserFailure = createAction('[User] Login User Failure', props<{ error: Error }>());

export const logoutUser = createAction('[User] Logi out User', props<{ id: number }>());
export const logoutUserSuccess = createAction('[User] Login out User Success');
export const logoutUserFailure = createAction('[User] Login out User Failure', props<{ error: Error }>());
