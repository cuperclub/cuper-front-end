import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';
import { AngularTokenService } from 'angular-token';


interface Password {
  passwordNew: string;
  passwordCurrent: string;
}

@Component({
  selector: 'cuper-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent {
  passwordForm: any = {}
  errorsForm: any = {};
  showPassword: any = {new: false, current: false};

  constructor(
    private message: MatSnackBar,
    private tokenService: AngularTokenService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public password: Password
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(password): void {
    this.tokenService.updatePassword({
      password: password.passwordNew,
      passwordConfirmation: password.passwordNew,
      passwordCurrent: password.passwordCurrent,
    }).subscribe(
      res =>    this.onSuccess(res),
      error =>  this.onError(error)
    );
  }

  onSuccess(resp): void {
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    let errors = resp.error ? resp.error.errors : {};
    this.errorsForm = errors
  }

  toggleShowPassword(field) {
    this.showPassword[field] = !this.showPassword[field];
  }
}
