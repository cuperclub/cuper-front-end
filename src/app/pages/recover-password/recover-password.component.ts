import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services';

@Component({
  selector: 'cuper-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  user_email: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private message: MatSnackBar) { }

  recoverPassword() {
    this.userService.recoverMyPassword(this.user_email).subscribe(
      (resp) => {
        this.message.open(resp['message'], '', {
          duration: 2000
        });
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
