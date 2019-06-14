import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';

import { UserService } from 'src/app/services';
import { User } from '../../models';

interface FileOptions {
  file?: File;
  imageBase64?: string | ArrayBuffer;
}

@Component({
  selector: 'cuper-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  errorsForm: any = {};
  uploadFile: FileOptions = {};

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
    let input = new FormData();
    input.append('name', user.name);
    input.append('email', user.email);
    input.append('image', this.uploadFile.file);
    this.userService.updateMyData(input).subscribe(
      (resp) => {
        this.translate.get('common.messages.updated').subscribe((message: string) => {
          this.message.open(message, '', {
            duration: 2000
          });
          const user = this.saveAndGetUserFromStorage(resp);
          this.dialogRef.close(user);
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

  onFileChange(event): void {
    let reader = new FileReader();
    const file = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadFile = { file: file, imageBase64: reader.result };
      };
    }
  }

}
