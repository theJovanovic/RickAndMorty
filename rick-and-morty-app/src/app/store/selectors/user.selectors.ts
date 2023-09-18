import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from "../reducers/user.reducer"


// Feature selector
export const selectUserFeature = createFeatureSelector<UserState>('user');

// Individual selectors
export const selectToken = createSelector(
  selectUserFeature,
  (state: UserState) => state.token
);