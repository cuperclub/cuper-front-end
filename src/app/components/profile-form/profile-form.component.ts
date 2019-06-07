import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';

import { UserService } from 'src/app/services';
import { User } from '../../models';

@Component({
  selector: 'cuper-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  user: User;
  errorsForm: any = {};

  constructor(
    private userService: UserService,
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(user): void {
    this.userService.updateMyData(user).subscribe(
      (resp) => {
        this.translate.get('common.messages.updated').subscribe((message: string) => {
          this.message.open(message, '', {
            duration: 2000
          });
          this.user = this.saveAndGetUserFromStorage(resp);
          this.dialogRef.close(this.user);
        });
      },
      ({ error }) => {
        this.errorsForm = error;
      }
    );
  }

  saveAndGetUserFromStorage(user){
    this.userService.saveDataOnLocalStorage(user);
    return this.userService.getDataOnLocalStorage();
  }

}
