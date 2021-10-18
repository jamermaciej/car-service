import { UserService } from 'src/app/core/services/user/user.service';
import { Injectable } from '@angular/core';

import * as usersActions from './../actions/users.actions';
import * as authActions from './../../../store/actions/auth.actions';

import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';
import { FirebaseErrors } from 'src/app/core/services/firebase-errors/firebase-errors.service';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private alertService: AlertService,
        private translocoService: TranslocoService
    ) {}

    getUsers$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.getUsers),
        switchMap(() => from(this.userService.getUsersData()).pipe(
            map((users: User[]) => usersActions.getUsersSuccess({ users })),
            catchError((error) => of(usersActions.getUsersFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    getUsersFailure$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.getUsersFailure),
        map((payload) => {
            const errorKey = FirebaseErrors.Parse(payload.error.code);
            const errorMessage = this.translocoService.translate(errorKey);
            this.alertService.showAlert(errorMessage, 'error');
            return authActions.authError({error: errorMessage});
        })
    ), {
        dispatch: true
    });

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.updateUser),
        pluck('user'),
        switchMap(user => from(this.userService.updateUserData(user)).pipe(
            map(() => usersActions.updateUserSuccess({ user })),
            catchError((error) => of(usersActions.updateUserFailure({ error })))
        ))
    ), {
        dispatch: true
    });
}
