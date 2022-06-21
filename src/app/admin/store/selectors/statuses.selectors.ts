import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as statusesReducer from './../reducer/statuses.reducer';

export const getStatusesState = createFeatureSelector<statusesReducer.State>('statuses');

export const getStatuses = createSelector(getStatusesState, (state: statusesReducer.State) => state?.statuses);
