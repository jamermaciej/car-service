import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';
import { State } from '../reducers';

// export const selectAuthRootState = createFeatureSelector<fromAuth.State>('auth');
// export const selectAuthState = createSelector(
//     selectAuthRootState,
//     (state: State) => state.auth
// );

export const getAuthState = (state: State) => state.auth;

export const isLoggedIn = createSelector(getAuthState, fromAuth.isLoggedIn);
export const getUser = createSelector(getAuthState, fromAuth.getUser);
export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getErrorMessage = createSelector(getAuthState, fromAuth.getErrorMessage);
