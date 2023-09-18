import { createReducer, on } from '@ngrx/store';
import * as UserActions from "../actions/user.actions";

export const featureKey = 'user'

export interface UserState {
  token: string | null;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
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

  on(UserActions.registerUserSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token,
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

  on(UserActions.loginUserSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token,
  })),

  on(UserActions.loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
