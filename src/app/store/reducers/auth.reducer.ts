import { updateEmailSuccess, confirmEmailSuccess } from './../actions/auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as authActions from '../actions/auth.actions';

export interface State {
    isLoggedIn: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState = {
    isLoggedIn: !!JSON.parse(localStorage.getItem('user')) || false,
    user: null,
    errorMessage: null
};

const authReducer = createReducer(
    initialState,
    on(authActions.login, (state, { email, password }) => ({
        ...state
    })),
    on(authActions.loginSuccess, (state, { user } ) => ({
        ...state,
        isLoggedIn: true,
        user,
        errorMessage: null
    })),
    on(authActions.loginFailure, (state, { error } ) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: null
    })),
    on(authActions.getMeSuccess, (state, { user } ) => ({
        ...state,
        user
    })),
    on(authActions.logoutSuccess, (state) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: null
    })),
    on(authActions.authError, (state, {error} ) => ({
        ...state,
        errorMessage: error
    })),
    on(authActions.register, (state, payload) => ({
        ...state
    })),
    on(authActions.registerSuccess, (state, { user } ) => ({
        ...state,
        errorMessage: null
    })),
    on(authActions.registerFailure, (state, { error } ) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: error
    })),
    on(authActions.updateEmailSuccess, (state, { user } ) => ({
        ...state,
        user
    })),
    on(authActions.confirmEmailSuccess, (state, { user }) => ({
        ...state,
        user: {
            ...state.user,
            emailVerified: user.emailVerified
        }
    })),
    on(authActions.updateUserSuccess, (state, { user } ) => ({
        ...state,
        user
    })),
    on(authActions.refreshToken, (state) => ({
        ...state,
        user: {
            ...state.user,
            isRefreshing: true
        }
    })),
    on(authActions.refreshTokenSuccess, (state, { accessToken } ) => ({
        ...state,
        user: {
            ...state.user,
            accessToken,
            isRefreshing: false
        }
    })),
    on(authActions.refreshTokenFailure, (state, { error } ) => ({
        ...state,
        user: {
            ...state.user,
            isRefreshing: false
        },
        errorMessage: error
    })),
  );

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}

export const isLoggedIn = (state: State) => state?.isLoggedIn;
export const getUser = (state: State) => state?.user;
export const getAccessToken = (state: State) => state?.user?.accessToken;
export const getRefreshToken = (state: State) => state?.user?.refreshToken;
export const getIsRefreshing = (state: State) => state?.user?.isRefreshing;
export const getErrorMessage = (state: State) => state.errorMessage;
