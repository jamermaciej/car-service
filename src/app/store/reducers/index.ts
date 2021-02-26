import { RouterStateUrl } from './router.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromAuth from './auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
    router: RouterReducerState<RouterStateUrl>;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    auth: fromAuth.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: ['auth'], rehydrate: true})(reducer);
  }

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
