import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailure, clearUsers } from '../actions/user.actions';
import { User } from '../../models/user.model';

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => [...state, ...users]),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(clearUsers, () =>initialState)
);
