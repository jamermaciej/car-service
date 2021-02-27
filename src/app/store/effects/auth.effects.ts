import { getRouterState } from './../selectors/router.selectors';
import { Store } from '@ngrx/store';
import { RegisterData } from './../../shared/models/register-data.model';
import { AlertService } from './../../core/services/alert/alert-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { User } from './../../shared/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable } from '@angular/core';

import * as authActions from '../actions/auth.actions';
import * as routerActions from '../actions/router.actions';

import { map, switchMap, mergeMap, tap, catchError, delay, withLatestFrom} from 'rxjs/operators';

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
        private alertService: AlertService,
        private store: Store
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
        withLatestFrom(this.store.select(getRouterState)),
        map(([, router]) => {
            const url = router.state.queryParams['returnUrl'];
            return routerActions.go({ path: [ url ? url : FlowRoutes.DASHBOARD ] });
        })
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
            routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
    ), {
        dispatch: false
    });

    register$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.register),
        switchMap((registerData: RegisterData) => from(this.userService.register(registerData)).pipe(
                map( (user) => authActions.registerSuccess({ user })),
                catchError(error => of(authActions.registerFailure({ error })))
            )
        )
    ), {
        dispatch: true
    });

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
        mergeMap(() => {
            const errorMessage = this.translocoService.translate('register.message.success');
            this.alertService.showAlert(errorMessage, 'success');
            return [
                routerActions.go({ path: [FlowRoutes.DASHBOARD] }),
                authActions.sendEmailVerification()
            ];
        })
    ), {
        dispatch: true
    });

    registerFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.registerFailure),
        map(payload => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    sendEmailVerification$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.sendEmailVerification),
        switchMap(() => from(this.userService.sendEmailVerification()).pipe(
            map(() => authActions.sendEmailVerificationSuccess()),
            catchError((error) => of(authActions.sendEmailVerificationFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    sendEmailVerificationFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.sendEmailVerificationFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
        })
    ), {
        dispatch: false
    });

    sendPasswordResetEmail$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.sendPasswordResetEmail),
        switchMap(({ email }) => from(this.userService.sendPasswordResetEmail(email)).pipe(
            map(() => authActions.sendPasswordResetEmailSuccess({ email })),
            catchError((error) => of(authActions.sendPasswordResetEmailFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    sendPasswordResetEmailSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.sendPasswordResetEmailSuccess),
        map((email) => {
            const successMessage = this.translocoService.translate('forgot_password.message.success.send', email);
            this.alertService.showAlert(successMessage, 'success', 5000);
            return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
    ), {
        dispatch: true
    });

    sendPasswordResetEmailFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.sendPasswordResetEmailFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    updatePassword$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.updatePassword),
        switchMap((payload) => from(this.userService.updatePassword(payload.code, payload.password)).pipe(
            map(() => authActions.updatePasswordSuccess()),
            catchError((error) => of(authActions.updatePasswordFailure({ error })))
        ))
    ), {
        dispatch: true
    });


    updatePasswordSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.updatePasswordSuccess),
        map(() => {
            const successMessage = this.translocoService.translate('forgot_password.message.success.update');
            this.alertService.showAlert(successMessage, 'success', 2000);
            return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
    ), {
        dispatch: true
    });

    updatePasswordFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.updatePasswordFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    confirmEmail$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.confirmEmail),
        switchMap((payload) => from(this.userService.confirmEmail(payload.code)).pipe(
            map(() => authActions.confirmEmailSuccess()),
            catchError((error) => of(authActions.confirmEmailFailure({ error })))
        ))
    ), {
        dispatch: true
    });


    confirmEmailSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.confirmEmailSuccess),
        tap(() => this.router.navigate([FlowRoutes.DASHBOARD])),
        delay(100),
        map(() => {
            const successMessage = this.translocoService.translate('confirm_email.message.success');
            this.alertService.showAlert(successMessage, 'success', 2000);
        })
    ), {
        dispatch: false
    });

    confirmEmailFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.confirmEmailFailure),
        tap(() => this.router.navigate([FlowRoutes.DASHBOARD])),
        delay(100),
        mergeMap((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return [
                authActions.authError({error: errorMessage})
            ];
        })
    ), {
        dispatch: true
    });

    changePassword$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.changePassword),
        switchMap((payload) => from(this.userService.changePassword(payload.oldPassword, payload.newPassword)).pipe(
            map(() => authActions.changePasswordSuccess()),
            catchError((error) => of(authActions.changePasswordFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    changePasswordSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.changePasswordSuccess),
        map(() => {
            const successMessage = this.translocoService.translate('Password updated!');
            this.alertService.showAlert(successMessage, 'success', 2000);
        })
    ), {
        dispatch: false
    });

    changePasswordFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.changePasswordFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    deleteAcctount$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.deleteAccount),
        switchMap((payload) => from(this.userService.deleteAccount(payload.password)).pipe(
            map(() => authActions.deleteAccountSuccess()),
            catchError((error) => of(authActions.deleteAccountFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    deleteAcctountSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.deleteAccountSuccess),
        map(() => {
            const successMessage = this.translocoService.translate('Account deleted!');
            this.alertService.showAlert(successMessage, 'success', 2000);
            localStorage.removeItem('user');
            return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
    ), {
        dispatch: true
    });

    deleteAcctountFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.deleteAccountFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    updateEmail$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.updateEmail),
        switchMap((payload) => from(this.userService.updateEmail(payload.password, payload.email)).pipe(
            map((user: User) => authActions.updateEmailSuccess({ user })),
            catchError((error) => of(authActions.updateEmailFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    updateEmailSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.updateEmailSuccess),
        map((payload) => {
            const successMessage = this.translocoService.translate('Email updated!');
            this.alertService.showAlert(successMessage, 'success', 2000);
            localStorage.setItem('user', JSON.stringify(payload.user));
        })
    ), {
        dispatch: false
    });

    updateEmailFailure$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.updateEmailFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });
}
