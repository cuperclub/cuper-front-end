import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, UtilsService } from 'src/app/services';
import { User } from '../../models';
import { AvatarFileComponent } from '../avatar-file/avatar-file.component';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';
import { MatButton } from '@angular/material/button';

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
    styleUrls: ['./profile-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, AvatarFileComponent, MatFormField, MatInput, MatError, ControlMessagesComponent, MatButton, TranslateModule]
})
export class ProfileFormComponent implements OnInit {
  profileForm: UntypedFormGroup;
  uploadFile: FileOptions;

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private utilsService: UtilsService,
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataOptions
  ) {}

  ngOnInit() {
    this.data.user.image = this.data.user.image || this.utilsService.getAvatar(this.data.user.join_at);
    const defaultUser: User = {
      name: '',
      email: '',
      national_id: ''
    };
    const currentUser = Object.assign(defaultUser, this.data.user);
    this.profileForm = this.fb.group({
      name: [currentUser.name, [Validators.required]],
      email: [currentUser.email, [Validators.required]],
      national_id: [currentUser.national_id, []]
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const user = this.profileForm.value;
    let input = new FormData();
    input.append('name', user.name);
    input.append('email', user.email);
    input.append('national_id', user.national_id ? user.national_id : '');
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
        for (let key in error) {
          this.profileForm.controls[key].setErrors({'backendError': error[key]});
        }
      }
    );
  }

  onListenerFile = (uploadFile) => this.uploadFile = uploadFile;

}
