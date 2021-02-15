import { RegisterData } from './../../shared/models/register-data.model';
import { Creditionals } from './../../shared/models/creditionals.model';
import { User } from './../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{ email: string, password: string  }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const logoutSuccess = createAction(
    '[Auth] Logout Success'
);

export const logoutFailure = createAction(
    '[Auth] Logout Failure'
);

export const authError = createAction(
    '[Auth] Log Error',
    props<{ error: any }>()
);
