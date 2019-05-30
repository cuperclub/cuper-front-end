import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material';

import { UserLogin } from '../../../models';


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
      ({ body }) => {
        this.router.navigate(['home']);
        const { data } = body;
        this.message.open(data.name, '', {
          duration: 2000
        });
      },
      ({ error }) => {
        this.message.open(error.errors, '', {
          duration: 2000
        });
      }
    );
  }
}
