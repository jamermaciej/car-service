import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import * as usersReducer from './../reducer/users.reducer';

export const getUsersState = createFeatureSelector<usersReducer.State>('users');

export const getUsers = createSelector(getUsersState, (state: usersReducer.State) => state?.users);

export const getUser = createSelector(
    getUsers,
    (users: User[], uid: string) => {
        return users.find((user: User) => user?.uid === uid);
    }
);
