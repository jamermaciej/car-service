import { Status } from './../../../shared/models/status.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as statusesActions from '../actions/statuses.actions';

export interface State {
    statuses: Status[];
}

export const initialState: State = {
    statuses: []
};

const statusesReducer = createReducer(
    initialState,
    on(statusesActions.addStatusSuccess, (state, { status }) => ({
        ...state,
        statuses: [ ...state.statuses, status ]
    })),
    on(statusesActions.getStatusesSuccess, (state, { statuses }) => ({
        ...state,
        statuses
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return statusesReducer(state, action);
}
