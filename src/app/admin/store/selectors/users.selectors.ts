import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as usersReducer from './../reducer/users.reducer';

export const getUsersState = createFeatureSelector<usersReducer.State>('users');

export const getUsers = createSelector(getUsersState, (state: usersReducer.State) => state.users);
