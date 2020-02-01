import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material';
import { UserRegister } from 'src/app/models';
import { UserService } from 'src/app/services';

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

  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private message: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  register() {
    this.tokenService.registerAccount({
      login: this.user.email,
      password: this.user.password,
      passwordConfirmation: this.user.password,
      name: this.user.name
    }).subscribe(
      () => {
        this.router.navigate(['home/dashboard']);
      },
      ({ error }) => {
        let errors = error.errors.full_messages;
            errors = errors.join(', ');
        this.message.open(errors, '', {
          duration: 10000
        });
      }
    );
  }

  loginWithFacebook() {
    this.tokenService.signInOAuth(
      'facebook',
      ).subscribe(
        () =>    this.onSuccess(),
        error =>  this.onError(error)
      );
  }

  loginWithGoogle() {
    this.tokenService.signInOAuth(
      'google_oauth2',
      ).subscribe(
        () =>    this.onSuccess(),
        error =>  this.onError(error)
      );
  }

  onSuccess(): void {
    this.router.navigateByUrl('/home/dashboard');
  }

  onError(error): void {
    this.message.open(error.errors, '', {
      duration: 2000
    });
  }

}
