import { AlertService } from './../../core/services/alert/alert-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { User } from './../../shared/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable } from '@angular/core';

import * as authActions from '../actions/auth.actions';
import * as routerActions from '../actions/router.actions';

import { map, exhaustMap, switchMap, mergeMap, tap, catchError, share, flatMap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { FirebaseErrors } from 'src/app/core/services/firebase-errors/firebase-errors.service';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private translocoService: TranslocoService,
        private snackBar: MatSnackBar,
        private alertService: AlertService
    ) {}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.login),
        switchMap(creditionals => from(this.userService.login(creditionals.email, creditionals.password)).pipe(
                map( (user: User) => authActions.loginSuccess({ user })),
                catchError(error => of(authActions.loginFailure({ error })))
            )
        )
    ), {
        dispatch: true
    });

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
        map(() => routerActions.go({ path: [FlowRoutes.DASHBOARD] }))
    ), {
        dispatch: true
    });

    loginFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.loginFailure),
        map(payload => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.logout),
        switchMap(() => {
            return from(this.userService.signOut()).pipe(
                map(response => authActions.logoutSuccess()),
                catchError(error => of(authActions.logoutFailure()))
            );
        }
        )
    ), {
        dispatch: true
    });

    logoutSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.logoutSuccess),
        tap(() => {
            localStorage.removeItem('user');
            this.router.navigate([FlowRoutes.LOGIN]);
        })
    ), {
        dispatch: false
    });
}
