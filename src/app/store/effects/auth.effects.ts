import { Role } from './../../core/enums/roles';
import { loadOrdersByUser } from './../../orders/store/actions/orders.actions';
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
import * as customersActions from '../../customers/store/actions';
import * as carsActions from '../../cars/store/actions';
import * as usersActions from '../../admin/store/actions';
import * as statusesActions from '../../admin/store/actions';
import * as ordersActions from '../../orders/store/actions';

import {
  map,
  switchMap,
  mergeMap,
  tap,
  catchError,
  delay,
  filter,
  concatMap,
  withLatestFrom,
  pluck,
} from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { FirebaseErrors } from 'src/app/core/services/firebase-errors/firebase-errors.service';
import * as fromRoot from './../reducers';
import { getUser } from '../selectors/auth.selectors';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private translocoService: TranslocoService,
    private snackBar: MatSnackBar,
    private alertService: AlertService,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.login),
        switchMap((creditionals) =>
            this.authService.login(creditionals.email, creditionals.password)
          .pipe(
            map((user: User) => authActions.loginSuccess({ user })),
            catchError((error) => of(authActions.loginFailure(error)))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({ user }) => localStorage.setItem('user', JSON.stringify(user))),
        withLatestFrom(this.store.select(getRouterState)),
        concatMap(([user, router]) => {
          const actions = [];
          const url = router.state.queryParams['returnUrl'];
          // if ( user.user.roles.includes(Role.ADMIN) || user.user.roles.includes(Role.MANAGER) ) {
          //     actions.push(ordersActions.loadOrders());
          // } else {
          //     actions.push(ordersActions.loadOrdersByUser({ id: user.user.uid }));
          // }
          actions.push(ordersActions.loadOrders());
          actions.push(
            customersActions.loadCustomers(),
            carsActions.loadCars(),
            usersActions.getUsers(),
            statusesActions.getStatuses(),
            routerActions.go({ path: [url ? url : FlowRoutes.DASHBOARD] })
          );
          return actions;
        })
      ),
    {
      dispatch: true,
    }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailure),
        map((payload) => {
          this.alertService.showAlert(payload.error, 'error');
          return authActions.authError({ error: payload.error });
        })
      ),
    {
      dispatch: true,
    }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        map(() => authActions.logoutSuccess())
      ),
    {
      dispatch: true,
    }
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logoutSuccess),
        map(() => {
          localStorage.removeItem('user');
          const successMessage = this.translocoService.translate(
            'account.logout.message.success'
          );
          this.alertService.showAlert(successMessage, 'success');
          return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
      ),
    {
      dispatch: true,
    }
  );

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.register),
        switchMap((payload) =>
          this.authService.register(payload.registerData).pipe(
            map((user) => authActions.registerSuccess({ user })),
            catchError((error) => of(authActions.registerFailure(error)))
          )
        )
      ),
    {
      dispatch: true,
    }
  );

    registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.registerSuccess),
        mergeMap(() => {
          const errorMessage = this.translocoService.translate(
            'register.message.success'
          );
          this.alertService.showAlert(errorMessage, 'success');
          return [
            routerActions.go({ path: [FlowRoutes.LOGIN] }),
          ];
        })
      ),
    {
      dispatch: true,
    }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.registerFailure),
        map((payload) => {
          this.alertService.showAlert(payload.error, 'error');
          return authActions.authError({ error: payload.error });
        })
      ),
    {
      dispatch: true,
    }
  );

  sendEmailVerification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.sendEmailVerification),
        pluck('email'),
        switchMap(email =>
          this.authService.sendVerifiyEmail(email).pipe(
            map(() => authActions.sendEmailVerificationSuccess()),
            catchError((error) =>
              of(authActions.sendEmailVerificationFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  sendEmailVerificationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.sendEmailVerificationFailure),
        map((payload) => {
          // const errorKey = FirebaseErrors.Parse(payload.error.code);
          // const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(payload.error.error, 'error');
        })
      ),
    {
      dispatch: false,
    }
  );

  // sendPasswordResetEmail$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.sendPasswordResetEmail),
  //       switchMap(({ email }) =>
  //         from(this.userService.sendPasswordResetEmail(email)).pipe(
  //           map(() => authActions.sendPasswordResetEmailSuccess({ email })),
  //           catchError((error) =>
  //             of(authActions.sendPasswordResetEmailFailure({ error }))
  //           )
  //         )
  //       )
  //     ),
  //   {
  //     dispatch: true,
  //   }
  // );

  sendPasswordResetEmailSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.sendPasswordResetEmailSuccess),
        map((email) => {
          const successMessage = this.translocoService.translate(
            'forgot_password.message.success.send',
            email
          );
          this.alertService.showAlert(successMessage, 'success', 5000);
          return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
      ),
    {
      dispatch: true,
    }
  );

  sendPasswordResetEmailFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.sendPasswordResetEmailFailure),
        map((payload) => {
          const errorKey = FirebaseErrors.Parse(payload.error.code);
          const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(errorMessage, 'error');
          return authActions.authError({ error: errorMessage });
        })
      ),
    {
      dispatch: true,
    }
  );

  // updatePassword$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.updatePassword),
  //       switchMap((payload) =>
  //         from(
  //           this.userService.updatePassword(payload.code, payload.password)
  //         ).pipe(
  //           map(() => authActions.updatePasswordSuccess()),
  //           catchError((error) =>
  //             of(authActions.updatePasswordFailure({ error }))
  //           )
  //         )
  //       )
  //     ),
  //   {
  //     dispatch: true,
  //   }
  // );

  updatePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updatePasswordSuccess),
        map(() => {
          const successMessage = this.translocoService.translate(
            'forgot_password.message.success.update'
          );
          this.alertService.showAlert(successMessage, 'success', 2000);
          return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
      ),
    {
      dispatch: true,
    }
  );

  updatePasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updatePasswordFailure),
        map((payload) => {
          const errorKey = FirebaseErrors.Parse(payload.error.code);
          const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(errorMessage, 'error');
          return authActions.authError({ error: errorMessage });
        })
      ),
    {
      dispatch: true,
    }
  );

  confirmEmail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.confirmEmail),
        switchMap(({ userId, code }) =>
          this.authService.verifyEmail(userId, code).pipe(
            concatMap(user => {
              const actions = [];
              const isLogged = !!JSON.parse(localStorage.getItem('user'));

              if (isLogged) {
                localStorage.setItem('user', JSON.stringify(user));
                actions.push(authActions.updateUserSuccess({ user }));
              }

              actions.push(authActions.confirmEmailSuccess({ user }));

              return actions;
            }),
            catchError((error) =>
              of(authActions.confirmEmailFailure(error))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  confirmEmailSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.confirmEmailSuccess),
        tap(() =>
          this.store.dispatch(routerActions.go({ path: [FlowRoutes.PROFILE] }))
        ),
        // delay(100),
        map((user) => {
          const successMessage = this.translocoService.translate(
            'confirm_email.message.success'
          );
          this.alertService.showAlert(successMessage, 'success', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  confirmEmailFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.confirmEmailFailure),
        tap(() =>
          this.store.dispatch(
            routerActions.go({ path: [FlowRoutes.DASHBOARD] })
          )
        ),
        // delay(100),
        mergeMap((payload) => {
          // const errorKey = FirebaseErrors.Parse(payload.error.code);
          // const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(payload.error, 'error');
          return [authActions.authError({ error: payload.error })];
        })
      ),
    {
      dispatch: true,
    }
  );

  // changePassword$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.changePassword),
  //       switchMap((payload) =>
  //         from(
  //           this.userService.changePassword(
  //             payload.oldPassword,
  //             payload.newPassword
  //           )
  //         ).pipe(
  //           map(() => authActions.changePasswordSuccess()),
  //           catchError((error) =>
  //             of(authActions.changePasswordFailure({ error }))
  //           )
  //         )
  //       )
  //     ),
  //   {
  //     dispatch: true,
  //   }
  // );

  changePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.changePasswordSuccess),
        map(() => {
          const successMessage = this.translocoService.translate(
            'account.change_password.message.success'
          );
          this.alertService.showAlert(successMessage, 'success', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  changePasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.changePasswordFailure),
        map((payload) => {
          const errorKey = FirebaseErrors.Parse(payload.error.code);
          const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(errorMessage, 'error');
          return authActions.authError({ error: errorMessage });
        })
      ),
    {
      dispatch: true,
    }
  );

  // deleteAcctount$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.deleteAccount),
  //       switchMap((payload) =>
  //         from(this.userService.deleteAccount(payload.password)).pipe(
  //           map(() => authActions.deleteAccountSuccess()),
  //           catchError((error) =>
  //             of(authActions.deleteAccountFailure({ error }))
  //           )
  //         )
  //       )
  //     ),
  //   {
  //     dispatch: true,
  //   }
  // );

  deleteAcctountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.deleteAccountSuccess),
        map(() => {
          const successMessage = this.translocoService.translate(
            'account.delete_account.message.success'
          );
          this.alertService.showAlert(successMessage, 'success', 2000);
          localStorage.removeItem('user');
          return routerActions.go({ path: [FlowRoutes.LOGIN] });
        })
      ),
    {
      dispatch: true,
    }
  );

  deleteAcctountFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.deleteAccountFailure),
        map((payload) => {
          const errorKey = FirebaseErrors.Parse(payload.error.code);
          const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(errorMessage, 'error');
          return authActions.authError({ error: errorMessage });
        })
      ),
    {
      dispatch: true,
    }
  );

  // updateEmail$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.updateEmail),
  //       withLatestFrom(this.store.select(getUser)),
  //       switchMap(([payload, currentUser]) => {
  //         if (currentUser.email === payload.email) {
  //           const errorMessage = this.translocoService.translate(
  //             'account.update_email.message.error'
  //           );
  //           this.alertService.showAlert(errorMessage, 'error');
  //           return of(authActions.authError({ error: errorMessage }));
  //         }
  //         return from(
  //           this.userService.updateEmail(payload.password, payload.email)
  //         ).pipe(
  //           map((user: User) => authActions.updateEmailSuccess({ user })),
  //           catchError((error) => of(authActions.updateEmailFailure({ error })))
  //         );
  //       })
  //     ),
  //   {
  //     dispatch: true,
  //   }
  // );

  changeEmail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updateEmail),
        switchMap((payload) => {
          return this.authService.changeEmail(payload.password, payload.email).pipe(
            map((user: User) => authActions.updateEmailSuccess({ user })),
            catchError((error) => of(authActions.updateEmailFailure({ error })))
          );
        })
      ),
    {
      dispatch: true,
    }
  );

  updateEmailSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updateEmailSuccess),
        map((payload) => {
          const successMessage = this.translocoService.translate(
            'account.update_email.message.success'
          );
          this.alertService.showAlert(successMessage, 'success', 2000);
          localStorage.setItem('user', JSON.stringify(payload.user));
        })
      ),
    {
      dispatch: false,
    }
  );

  updateEmailFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updateEmailFailure),
        map((payload) => {
          // const errorKey = FirebaseErrors.Parse(payload.error.code);
          // const errorMessage = this.translocoService.translate(errorKey);
          this.alertService.showAlert(payload.error.error, 'error');
          return authActions.authError({ error: payload.error.error });
        })
      ),
    {
      dispatch: true,
    }
  );

  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updateUser),
        switchMap((payload) =>
            this.userService.updateUser(payload.user).pipe(
            map((user) => {
              return authActions.updateUserSuccess({ user });
            }),
            catchError((error) =>
              of(authActions.updateUserFailure({ error }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updateUser),
        map((payload) => {
          this.alertService.showAlert('Profile updated.', 'success');
          localStorage.setItem('user', JSON.stringify(payload.user));
        })
      ),
    {
      dispatch: false,
    }
  );

}
