import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const loadUsers = createAction('[User] load Users List', props<{since: number; perPage: number}>());
export const loadUsersSuccess = createAction('[Users] load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] load Users Failure', props<{ error: string }>());
