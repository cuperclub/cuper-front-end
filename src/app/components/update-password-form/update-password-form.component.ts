import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';
import { MatButton } from '@angular/material/button';

interface Password {
  password: string;
  current_password: string;
}

@Component({
    selector: 'cuper-update-password-form',
    templateUrl: './update-password-form.component.html',
    styleUrls: ['./update-password-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatIcon, MatError, ControlMessagesComponent, MatButton, TranslateModule]
})
export class UpdatePasswordFormComponent implements OnInit{
  passwordForm: UntypedFormGroup;
  showPassword: any = {new: false, current: false};

  constructor(
    private fb: UntypedFormBuilder,
    private message: MatSnackBar,
    private authService: AuthService,
    private translate: TranslateService,
    private changeDetector: ChangeDetectorRef,
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
    this.changeDetector.markForCheck();
  }

  toggleShowPassword(field) {
    this.showPassword[field] = !this.showPassword[field];
  }
}
