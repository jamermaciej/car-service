import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/user.model';
import * as profileActions from '../actions/profile.actions';


@Injectable()
export class ProfileEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        // private router: Router,
        // private translocoService: TranslocoService,
        // private snackBar: MatSnackBar,
        // private alertService: AlertService
    ) {}

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(profileActions.updateUser),
        switchMap(action => from(this.userService.updateUserData(action.user)).pipe(
                mergeMap(() => {
                    const uid = action.user.uid;
                    return [
                        profileActions.updateUserSuccess({ uid }),
                        profileActions.getUser({ uid }),
                    ];
                }),
                catchError(error => of(profileActions.updateUserFailure(error)))
            )
        )
    ), {
        dispatch: true
    });

    getUser$ = createEffect(() => this.actions$.pipe(
        ofType(profileActions.getUser),
        switchMap(action => this.userService.getUserData(action.uid).pipe(
                map((user: User) => profileActions.getUserSuccess({ user })),
                catchError(error => of(profileActions.updateUserFailure(error)))
            )
        )
    ), {
        dispatch: true
    });
}
