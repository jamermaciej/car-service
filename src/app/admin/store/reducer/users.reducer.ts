import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import * as usersActions from '../actions/users.actions';
import * as authActions from '../../../store/actions/auth.actions';

export interface State {
    users: User[];
}

export const initialState: State = {
    users: null
};

const usersReducer = createReducer(
    initialState,
    on(usersActions.getUsersSuccess, (state, { users }) => ({
        ...state,
        users
    })),
    on(usersActions.getUsersFailure, state => ({
        ...state
    })),
    on(authActions.confirmEmailSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.uid === user.uid ? { ...u, emailVerified: true } : u)
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return usersReducer(state, action);
}
