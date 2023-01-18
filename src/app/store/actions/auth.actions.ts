import { User } from './../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';
import { RegisterData } from 'src/app/shared/models/register-data.model';

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

export const getMe = createAction('[Users] Get Me');

export const getMeSuccess = createAction(
  '[Users] Get Me Success',
  props<{ user: User }>()
);

export const getMeFailure = createAction(
  '[Users] Get Me Failure',
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

export const register = createAction(
    '[Auth] Register',
    props<{ registerData: RegisterData }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ user: User }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: any }>()
);

export const sendEmailVerification = createAction(
    '[Auth] Send Email Verification',
    props<{ email: string }>()
);

export const sendEmailVerificationSuccess = createAction(
    '[Auth] Send Email Verification Success'
);

export const sendEmailVerificationFailure = createAction(
    '[Auth] Send Email Verification Failure',
    props<{ error: any }>()
);

export const sendPasswordResetEmail = createAction(
    '[Auth] Send Password Reset Email',
    props<{ email: string }>()
);

export const sendPasswordResetEmailSuccess = createAction(
    '[Auth] Send Password Reset Email Success',
    props<{ email: string }>()
);

export const sendPasswordResetEmailFailure = createAction(
    '[Auth] Send Password Reset Email Failure',
    props<{ error: any }>()
);

export const updatePassword = createAction(
    '[Auth] Update Password',
    props<{ token: string, password: string, passwordConfirm: string }>()
);

export const updatePasswordSuccess = createAction(
    '[Auth] Update Password Success'
);

export const updatePasswordFailure = createAction(
    '[Auth] Update Password Failure',
    props<{ error: any }>()
);

export const confirmEmail = createAction(
    '[Auth] Confirm Email',
    props<{ userId: string, code: string }>()
);

export const confirmEmailSuccess = createAction(
    '[Auth] Confirm Email Success',
    props<{ user: User }>()
);

export const confirmEmailFailure = createAction(
    '[Auth] Confirm Email Failure',
    props<{ error: any }>()
);

export const changePassword = createAction(
    '[Auth] Change Passsword',
    props<{ oldPassword: string, newPassword: string }>()
);

export const changePasswordSuccess = createAction(
    '[Auth] Change Passsword Success'
);

export const changePasswordFailure = createAction(
    '[Auth] Change Passsword Failure',
    props<{ error: any }>()
);

export const deleteAccount = createAction(
    '[Auth] Delete Account',
    props<{ password: string }>()
);

export const deleteAccountSuccess = createAction(
    '[Auth] Delete Account Success',
    props<{ message: string }>()
);

export const deleteAccountFailure = createAction(
    '[Auth] Delete Account Failure',
    props<{ error: any }>()
);

export const updateEmail = createAction(
    '[Auth] Update Email',
    props<{ password: string, email: string }>()
);

export const updateEmailSuccess = createAction(
    '[Auth] Update Email Success',
    props<{ user: User }>()
);

export const updateEmailFailure = createAction(
    '[Auth] Update Email Failure',
    props<{ error: any }>()
);

export const updateUser = createAction(
    '[Auth] Update User',
    props<{ user: User }>()
);

export const updateUserSuccess = createAction(
    '[Auth] Update User Success',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[Auth] Update User Failure',
    props<{ error: any }>()
);
