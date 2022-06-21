import { Action, createReducer, on } from '@ngrx/store';
import * as uiActions from './../actions/ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

const uiReducer = createReducer(
    initialState,
    on(uiActions.startLoading, state => ({
        ...state,
        isLoading: true
    })),
    on(uiActions.stopLoading, state => ({
        ...state,
        isLoading: false
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return uiReducer(state, action);
}

export const isLoading = (state: State) => state?.isLoading;
