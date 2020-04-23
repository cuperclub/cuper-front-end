import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material';

import { UserLogin } from 'src/app/models';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreActions, UserStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserLogin = {
    email: '',
    password: ''
  };
  hide: true;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private message: MatSnackBar,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.error$ = this.store$.select(
      UserStoreSelectors.selectLoginError
    );
    this.error$.subscribe(errors => {
      if(errors) {
        this.message.open(errors, '', {duration: 2000})
      }
    });
  }

  login() {
    const loginPayLoad = {
      email: this.user.email,
      password: this.user.password
    };
    this.store$.dispatch(new UserStoreActions.LoginRequestAction(loginPayLoad));
  }

  loginWithFacebook() {
    this.tokenService.signInOAuth(
      'facebook',
      ).subscribe(
        res =>    this.onSuccess(res),
        error =>  this.onError(error)
      );
  }

  loginWithGoogle() {
    this.tokenService.signInOAuth(
      'google_oauth2',
      ).subscribe(
        res =>    this.onSuccess(res),
        error =>  this.onError(error)
      );
  }

  onSuccess(data): void {
    const homeRoute = data.is_admin ? '/admin/companies' : '/home/dashboard'
    this.router.navigateByUrl(homeRoute);
  }

  onError(resp): void {
    const errors = resp.error && resp.error.errors ? resp.error.errors : [];
    this.message.open(errors, '', {
      duration: 2000
    });
  }
}
