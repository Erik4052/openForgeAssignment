import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const loadUser = createAction('[User] Load User', props<{ login: string }>());

export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());

export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());

export function loadUsersFailure(arg0: { error: any; }): any {
  throw new Error('Function not implemented.');
}

