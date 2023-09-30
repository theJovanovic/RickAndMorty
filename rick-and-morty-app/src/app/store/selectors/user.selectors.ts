import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from "../reducers/user.reducer"


export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectId = createSelector(
  selectUserFeature,
  (state: UserState) => state.id
);

export const selectFirstname = createSelector(
  selectUserFeature,
  (state: UserState) => state.firstname
);

export const selectLastname = createSelector(
  selectUserFeature,
  (state: UserState) => state.lastname
);

export const selectEmail = createSelector(
  selectUserFeature,
  (state: UserState) => state.email
);

export const selectRole = createSelector(
  selectUserFeature,
  (state: UserState) => state.role
);

export const selectToken = createSelector(
  selectUserFeature,
  (state: UserState) => state.token
);