import { createReducer, on } from "@ngrx/store";
import { loadUser, loadUserSuccess, loadUserFailure } from "../actions/user-search.actions";
import { SelectedUserState } from "../state/user.state";

export const initialState: SelectedUserState = {
  user: null,
  loading: false,
  error: null
};

export const userSearchReducer = createReducer(
  initialState,
  on(loadUser, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),

  on(loadUserFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error
  })),

 // on(clearSearchUser, () => initialState)
);
