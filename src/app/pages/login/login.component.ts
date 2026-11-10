import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserLogin } from 'src/app/models';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: MatSnackBar
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.signIn({
      login: this.user.email,
      password: this.user.password
    }).subscribe(
      (resp) => {
        const { body: { data } } = resp;
        this.onSuccess(data);
      },
      error =>  this.onError(error)
    );
  }

  loginWithFacebook() {
    this.authService.signInOAuth(
      'facebook',
      ).subscribe(
        res =>    this.onSuccess(res),
        error =>  this.onError(error)
      );
  }

  loginWithGoogle() {
    this.authService.signInOAuth(
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
