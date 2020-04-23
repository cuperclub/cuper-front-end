import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as userActions from './actions';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';

@Injectable()
export class UserStoreEffects {

  constructor(
    private tokenService: AngularTokenService,
    private actions$: Actions,
    private router: Router,
  ) { }

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoginRequestAction>(
      userActions.ActionTypes.LOGIN_REQUEST
    ),
    switchMap(action =>
      this.tokenService
        .signIn(
          {
            login: action.payload.email,
            password: action.payload.password
          }
        )
        .pipe(
          map(
            ({ body: { data } }) => {
              this.onLoginRedirect(data);
              return new userActions.LoginSuccessAction({
                user: data
              });
            }
          ),
          catchError((resp) => {
              const errors = resp.error && resp.error.errors ? resp.error.errors : [];
              return observableOf(new userActions.LoginFailureAction({error: errors.join(',')}));
            }
          )
        )
    )
  );

  onLoginRedirect(data) {
    const homeRoute = data.is_admin ? '/admin/companies' : '/home/dashboard'
    this.router.navigateByUrl(homeRoute);
  }
}
