import { Action } from '@ngrx/store';
import { User } from '../../models';

export enum ActionTypes {
  LOGIN_REQUEST = '[User] Login Request',
  LOGIN_FAILURE = '[User] Login Failure',
  LOGIN_SUCCESS = '[User] Login Success'
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export type Actions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction;
