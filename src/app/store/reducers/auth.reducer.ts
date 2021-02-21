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
    user: JSON.parse(localStorage.getItem('user')) || null,
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
    on(authActions.logout, (state) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: null
    })),
    on(authActions.authError, (state, {error} ) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: error
    })),
    on(authActions.register, (state, payload) => ({
        ...state
    })),
    on(authActions.registerSuccess, (state, { user } ) => ({
        ...state,
        isLoggedIn: true,
        user,
        errorMessage: null
    })),
    on(authActions.registerFailure, (state, { error } ) => ({
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: null
    })),
  );

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
