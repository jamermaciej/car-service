import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const getUsers = createAction('[Users] Get Users');

export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: User[] }>()
);

export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Users] Updatet User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ user: User }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: any }>()
);
