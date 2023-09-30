import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AdminState } from '../reducers/admin.reducer'

export const selectAdminState = createFeatureSelector<AdminState>('admin')

export const selectUsers = createSelector(
    selectAdminState,
    (state: AdminState) => state.users
)
