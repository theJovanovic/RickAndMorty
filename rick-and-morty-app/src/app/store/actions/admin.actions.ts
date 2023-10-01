import { createAction, props } from "@ngrx/store"
import { Character } from "src/app/models/Character"
import { Episode } from "src/app/models/Episode"
import { UserData } from "src/app/models/UserData"
import { Location } from "src/app/models/Location"

export const loadUsers = createAction('[Admin] Load Users')
export const loadUsersSuccess = createAction('[Admin] Load Users Success', props<{ users: UserData[] }>())
export const loadUsersFailure = createAction('[Admin] Load Users Failure', props<{ error: Error }>())

export const modifyUser = createAction('[Admin] Modidy User', props<{ user: UserData }>())
export const modifyUserSuccess = createAction('[Admin] Modidy User Success', props<{ users: UserData[] }>())
export const modifyUserFailure = createAction('[Admin] Modidy User Failure', props<{ error: Error }>())

export const deleteUser = createAction('[Admin] Delete User', props<{ id: number }>())
export const deleteUserSuccess = createAction('[Admin] Delete User Success', props<{ users: UserData[] }>())
export const deleteUserFailure = createAction('[Admin] Delete User Failure', props<{ error: Error }>())

export const deleteCharacter = createAction('[Admin] Delete Character', props<{ characterId: number }>())
export const deleteCharacterSuccess = createAction('[Admin] Delete Character Success', props<{ data: Character[], prevUrl: string | null, nextUrl: string | null, pages: number }>())
export const deleteCharacterFailure = createAction('[Admin] Delete Character Failure', props<{ error: Error }>())

export const deleteEpisode = createAction('[Admin] Delete Episode', props<{ episodeId: number }>())
export const deleteEpisodeSuccess = createAction('[Admin] Delete Episode Success', props<{ data: Episode[], prevUrl: string | null, nextUrl: string | null, pages: number }>())
export const deleteEpisodeFailure = createAction('[Admin] Delete Episode Failure', props<{ error: Error }>())

export const deleteLocation = createAction('[Admin] Delete Location', props<{ locationId: number }>())
export const deleteLocationSuccess = createAction('[Admin] Delete Location Success', props<{ data: Location[], prevUrl: string | null, nextUrl: string | null, pages: number }>())
export const deleteLocationFailure = createAction('[Admin] Delete Location Failure', props<{ error: Error }>())