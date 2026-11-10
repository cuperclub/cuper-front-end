import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersComponent } from 'src/app/pages/admin/customers/customers.component';
import { UserService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'cuper-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss'],
    standalone: false
})
export class ChangePasswordDialogComponent implements OnInit{
  passwordFormGroup: UntypedFormGroup;

  constructor(
    private userService: UserService,
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CustomersComponent>,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.passwordFormGroup = this.fb.group({
      email: ['', Validators.required],
      new_password: ['', Validators.required]
    });
  }

  onSubmitPassword(): void {
    const userId = this.data.user.id;
    const inputPassword = {
      email: this.passwordFormGroup.value.email,
      password: this.passwordFormGroup.value.new_password
    };
    this.userService.changePassword(userId, inputPassword)
    .subscribe(
      (resp) => this.onSuccess(resp, 'common.messages.updated'),
      (error) =>  this.onError(error)
    );
  }

  onSuccess(resp: object, message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError = (resp) => {
    for (let key in resp.error) {
      this.passwordFormGroup.controls[key].setErrors({'backendError': resp.error[key]});
    }
  }

}
