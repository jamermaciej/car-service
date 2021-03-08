import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from '../index';

export const getUsersState = createFeatureSelector<fromUsers.State>('users');

export const getUsers = createSelector(getUsersState, (state: fromUsers.State) => state.users);
