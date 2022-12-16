import { User } from './../../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';


export const updateUser = createAction(
    '[Profile] Update User',
    props<{ user: User, alert: boolean }>()
);

export const updateUserSuccess = createAction(
    '[Profile] Update User Success',
    props<{ user: User, alert: boolean }>()
);

export const updateUserFailure = createAction(
    '[Profile] Update User Failure',
    props<{ error: any }>()
);

export const getUser = createAction(
    '[Profile] Get User',
    props<{ uid: string }>()
);

export const getUserSuccess = createAction(
    '[Profile] Get User Success',
    props<{ user: User }>()
);

export const getUserFailure = createAction(
    '[Profile] Get User Failure',
    props<{ error: any }>()
);
