import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { UpdatePasswordFormComponent } from '../update-password-form/update-password-form.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../models';
import { UserService, UtilsService } from 'src/app/services';
import { MatCard } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AvatarFileComponent } from '../avatar-file/avatar-file.component';


@Component({
    selector: 'cuper-card-user',
    templateUrl: './card-user.component.html',
    styleUrls: ['./card-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, NgIf, AvatarFileComponent, TranslateModule]
})
export class CardUserComponent implements OnInit {
  @Input() user: User;
  isLodingImage: boolean = false;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.user.image = this.user.image_url || this.utilsService.getAvatar(this.user.join_at);
  }

  onUpdatePassword() {
    this.dialog.open(UpdatePasswordFormComponent, {
      width: '300px',
      data: {}
    });
  }

  onUpdateInformation() {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '400px',
      data: {
        user: Object.assign({}, this.user)
      }
    });

    dialogRef.beforeClosed().subscribe(user => {
      if(user){
        this.updateUserData(user);
      }
    });
  }

  onListenerFile(uploadFile){
    this.isLodingImage = true;
    let input = new FormData();
    input.append('image', uploadFile.file);
    this.userService.updateMyData(input).subscribe(
      (resp) => this.onSuccess(resp),
      error => this.onError(error)
    );
  }

  onSuccess(resp): void {
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.updateUserData(resp);
      this.isLodingImage = false;
    });
  }

  onError(resp): void {
    let errors = resp.error ? resp.error.errors : {};
    this.message.open(errors, '', {
      duration: 2000
    });
  }

  updateUserData = (data) => {
    this.user = data;
    this.userService.userDataEdited = data;
    this.userService.observerData.next(data);
  }
}
