import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegister } from 'src/app/models';

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
    private authService: AuthService,
    private message: MatSnackBar
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService.registerAccount({
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
    this.authService.signInOAuth(
      'facebook',
      ).subscribe(
        () =>    this.onSuccess(),
        error =>  this.onError(error)
      );
  }

  loginWithGoogle() {
    this.authService.signInOAuth(
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
