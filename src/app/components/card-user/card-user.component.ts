import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

import { UserService } from 'src/app/services';
import { User } from '../../models';


@Component({
  selector: 'cuper-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
  @Input() user: User;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private message: MatSnackBar,
    private translate: TranslateService,
  ) { }

  ngOnInit() { }

  onUpdatePassword() {
    console.log('launch modal to change password');
  }

  onUpdateInformation() {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '400px',
      data: {
        user: Object.assign({}, this.user)
      }
    });

    dialogRef.afterClosed().subscribe(companyData => {
      if(companyData){
        this.userService.updateMyData(companyData).subscribe(
          (resp) => {
            this.translate.get('common.messages.updated').subscribe((message: string) => {
              this.message.open(message, '', {
                duration: 2000
              });
              this.user = this.saveAndGetUserFromStorage(resp);
            });
          },
          ({ error }) => {
            this.message.open(error.errors, '', {
              duration: 2000
            });
          }
        );
      }
    });
  }

  saveAndGetUserFromStorage(user){
    this.userService.saveDataOnLocalStorage(user);
    return this.userService.getDataOnLocalStorage();
  }
}
