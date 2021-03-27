import { Status } from './../../../shared/models/status.model';
import { createAction, props } from '@ngrx/store';

export const addStatus = createAction(
    '[Statuses] Add Status',
    props<{ status: Status }>()
);

export const addStatusSuccess = createAction(
    '[Statuses] Add Status Success',
    props<{ status: Status }>()
);

export const addStatusFailure = createAction(
    '[Statuses] Add Status Failure',
    props<{ error: any }>()
);


export const getStatuses = createAction(
    '[Statuses] Get Statuses'
);

export const getStatusesSuccess = createAction(
    '[Statuses] Get Statuses Success',
    props<{ statuses: Status[] }>()
);

export const getStatusesFailure = createAction(
    '[Statuses] Get Statuses Failure',
    props<{ error: any }>()
);
