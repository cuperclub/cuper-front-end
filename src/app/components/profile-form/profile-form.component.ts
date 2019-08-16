import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';

import { UserService, UtilsService } from 'src/app/services';
import { User } from '../../models';

interface FileOptions {
  file?: File;
  imageBase64?: string | ArrayBuffer;
}

interface DataOptions {
  user?: User;
}

@Component({
  selector: 'cuper-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  errorsForm: any = {};
  uploadFile: FileOptions;

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataOptions
  ) {}

  ngOnInit() {
    this.data.user.image = this.data.user.image || this.utilsService.getAvatar(this.data.user.join_at);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(user): void {
    let input = new FormData();
    input.append('name', user.name);
    input.append('email', user.email);
    input.append('national_id', user.national_id);
    if(this.uploadFile) input.append('image', this.uploadFile.file);

    this.userService.updateMyData(input).subscribe(
      (resp) => {
        this.translate.get('common.messages.updated').subscribe((message: string) => {
          this.message.open(message, '', {
            duration: 2000
          });
          this.dialogRef.close(resp);
        });
      },
      ({ error }) => {
        this.errorsForm = error;
      }
    );
  }

  onListenerFile = (uploadFile) => this.uploadFile = uploadFile;

}
