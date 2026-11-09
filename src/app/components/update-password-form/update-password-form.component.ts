import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { AuthService } from '../../services';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

interface Password {
  password: string;
  current_password: string;
}

@Component({
  selector: 'cuper-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit{
  passwordForm: UntypedFormGroup;
  showPassword: any = {new: false, current: false};

  constructor(
    private fb: UntypedFormBuilder,
    private message: MatSnackBar,
    private authService: AuthService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public password: Password
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.authService.updatePassword({
      password: this.passwordForm.value.password,
      passwordConfirmation: this.passwordForm.value.password,
      passwordCurrent: this.passwordForm.value.current_password,
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
    delete resp.error.errors['full_messages']
    for (let key in resp.error.errors) {
      this.passwordForm.controls[key].setErrors({'backendError': resp.error.errors[key]});
    }
  }

  toggleShowPassword(field) {
    this.showPassword[field] = !this.showPassword[field];
  }
}
