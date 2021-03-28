import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const getUsers = createAction(
    '[Users] Get Users'
);

export const getUsersSuccess = createAction(
    '[Users] Get Users Success',
    props<{ users: User[] }>()
);

export const getUsersFailure = createAction(
    '[Users] Get Users Failure',
    props<{ error: any }>()
);
