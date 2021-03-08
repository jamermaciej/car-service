import { ActionReducer, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';

export * from './users.reducer';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: ['users'], rehydrate: true})(reducer);
  }

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
