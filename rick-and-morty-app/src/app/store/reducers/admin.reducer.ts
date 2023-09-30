import { createReducer, on } from '@ngrx/store'
import * as AdminActions from '../actions/admin.actions'
import { UserData } from 'src/app/models/UserData'

export const featureKey = 'admin'

export interface AdminState {
	users: UserData[]
	loading: boolean
	error: Error | null
}

export const initialState: AdminState = {
	users: [],
	loading: false,
	error: null
}

export const reducer = createReducer(
	initialState,

	on(AdminActions.loadUsers, state => ({ ...state, loading: true })),
	on(AdminActions.loadUsersSuccess, (state, { users }) => ({ ...state, users: users, loading: false })),
	on(AdminActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),

	on(AdminActions.modifyUser, state => ({ ...state, loading: true })),
	on(AdminActions.modifyUserSuccess, (state, { users }) => ({ ...state, users: users, loading: false })),
	on(AdminActions.modifyUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
)
