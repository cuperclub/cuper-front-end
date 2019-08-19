import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'cuper-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  user_email: string = '';

  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private message: MatSnackBar) { }

  recoverPassword() {
    this.tokenService.resetPassword({
      login: this.user_email
    }).subscribe(
      (resp) => {
        this.router.navigateByUrl('login');
      },
      ({ error }) => {
        this.message.open(error.errors, '', {
          duration: 2000
        });
      }
    );
  }
}
