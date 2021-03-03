import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './../reducers';

export const selectUIRootState = createFeatureSelector<fromUI.State>('ui');

export const isLoading = createSelector(selectUIRootState, fromUI.isLoading);
