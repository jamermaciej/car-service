import { Status } from './../../../shared/models/status.model';
import { StatusService } from './../../services/status.service';
import { Injectable } from '@angular/core';

import * as statusesActions from './../actions/statuses.actions';
import * as authActions from './../../../store/actions/auth.actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { TranslocoService } from '@ngneat/transloco';
import { FirebaseErrors } from 'src/app/core/services/firebase-errors/firebase-errors.service';

@Injectable()
export class StatusesEffects {

    constructor(
        private actions$: Actions,
        private statusService: StatusService,
        private alertService: AlertService,
        private translocoService: TranslocoService
    ) {}

    addStatus$ = createEffect(() => this.actions$.pipe(
        ofType(statusesActions.addStatus),
        switchMap((paylaod) => this.statusService.addStatus(paylaod.status).pipe(
            map((status: Status) => statusesActions.addStatusSuccess({ status })),
            catchError((error) => of(statusesActions.addStatusFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    removeStatus$ = createEffect(() => this.actions$.pipe(
        ofType(statusesActions.removeStatus),
        switchMap((paylaod) => this.statusService.deleteStatus(paylaod.id).pipe(
            map((status: Status) => statusesActions.removeStatusSuccess({ status })),
            catchError((error) => of(statusesActions.removeStatusFailure({ error })))
        ))
    ), {
        dispatch: true
    });

    getStatuses$ = createEffect(() => this.actions$.pipe(
        ofType(statusesActions.getStatuses),
        switchMap(() => this.statusService.getStatuses().pipe(
            map((statuses: Status[]) => statusesActions.getStatusesSuccess({ statuses })),
            catchError((error) => of(statusesActions.getStatusesFailure({ error })))
        ))
    ), {
        dispatch: true
    });
}
