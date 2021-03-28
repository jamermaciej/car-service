import { RouterStateUrl } from './router.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromAuth from './auth.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromUI from './../../shared/store';
import * as authActions from '../actions/auth.actions';

export interface State {
    router: RouterReducerState<RouterStateUrl>;
    auth: fromAuth.State;
    ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    auth: fromAuth.reducer,
    ui: fromUI.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
      keys: [
        'auth',
        'admin',
        'cars',
        'users',
        'statuses'
      ],
      rehydrate: true
    })(reducer);
}

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: Action) => {

    if (action.type === authActions.logout.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer, clearState]
  : [localStorageSyncReducer];
