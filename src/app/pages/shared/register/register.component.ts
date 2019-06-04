import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material';
import { UserRegister } from '../../../models';

@Component({
  selector: 'cuper-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserRegister = {
    email: '',
    password: '',
    name: ''
  };

  hide: true;

  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private message: MatSnackBar
  ) { }

  ngOnInit() {
  }

  register() {
    debugger
    this.tokenService.registerAccount({
      login: this.user.email,
      password: this.user.password,
      passwordConfirmation: this.user.password,
      name: this.user.name
    }).subscribe(
      ({ body }) => {
        debugger
        this.router.navigate(['home']);
        const { data } = body;
        this.message.open(data.name, '', {
          duration: 2000
        });
      },
      ({ error }) => {
        debugger
        this.message.open(error.errors, '', {
          duration: 2000
        });
      }
    );
  }

}
