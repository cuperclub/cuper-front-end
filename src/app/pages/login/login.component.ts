import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material';

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
    private tokenService: AngularTokenService,
    private message: MatSnackBar
  ) { }

  ngOnInit() {
  }

  login() {
    this.tokenService.signIn({
      login: this.user.email,
      password: this.user.password
    }).subscribe(
      (resp) => {
        const { body: { data } } = resp;
        const homeRoute = data.is_admin ? '/admin/companies' : '/home/dashboard'
        this.router.navigateByUrl(homeRoute);
      },
      ({ error }) => {
        this.message.open(error.errors, '', {
          duration: 2000
        });
      }
    );
  }
}
