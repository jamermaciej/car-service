import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as authActions from '../actions/auth.actions';

export interface State {
    isLoggedIn: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState = {
    isLoggedIn: false,
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
    }))

  );

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
