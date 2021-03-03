import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as authActions from './../../../store/actions/auth.actions';

import { tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as fromRoot from './../reducers';
import * as uiActions from './../actions/ui.actions';

@Injectable()
export class UIEffects {

    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>
    ) {}

    showSpinner$ = createEffect(() => this.actions$.pipe(
        ofType(
            authActions.login,
            authActions.register
        ),
        tap(() => this.store.dispatch(uiActions.startLoading()))
    ), {
        dispatch: false
    });

    hideSpinner$ = createEffect(() => this.actions$.pipe(
        ofType(
            authActions.loginSuccess,
            authActions.loginFailure,
            authActions.registerSuccess,
            authActions.registerFailure
        ),
        tap(() => this.store.dispatch(uiActions.stopLoading()))
    ), {
        dispatch: false
    });
}
