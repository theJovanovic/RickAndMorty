import { createReducer, on } from '@ngrx/store';
import * as UserActions from "../actions/user.actions";

export const featureKey = 'user'

export interface UserState {
  id: number | null,
  firstname: string | null,
  lastname: string | null,
  email: string | null,
  token: string | null;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  token: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(UserActions.registerUser, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.registerUserSuccess, (state, { id, firstname, lastname, email, token }) => ({
    ...state,
    loading: false,
    id,
    firstname,
    lastname,
    email,
    token
  })),

  on(UserActions.registerUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.loginUser, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loginUserSuccess, (state, { id, firstname, lastname, email, token }) => ({
    ...state,
    loading: false,
    id,
    firstname,
    lastname,
    email,
    token
  })),

  on(UserActions.loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.logoutUserSuccess, (state) => ({
    ...state,
    loading: false,
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    token: null
  })),

  on(UserActions.setToken, (state) => ({
    ...state,
    loading: true
  })),

  on(UserActions.setTokenSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token: token
  }))
);
