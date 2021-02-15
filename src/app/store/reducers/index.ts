import { RouterStateUrl } from './router.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromAuth from './auth.reducer';

export interface State {
    router: RouterReducerState<RouterStateUrl>;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];
