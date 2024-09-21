import { User } from "src/app/models/user.model";

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const InitialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export interface  SelectedUserState {
  user: User | null;
  loading: boolean;
  error: any;
}
