import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, MatFormField, MatInput, MatButton, RouterLink, FooterComponent, TranslateModule]
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
