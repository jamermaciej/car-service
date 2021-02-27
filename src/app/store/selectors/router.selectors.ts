import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from '../reducers/router.reducer';

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
