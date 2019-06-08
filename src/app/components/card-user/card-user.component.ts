import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { UpdatePasswordFormComponent } from '../update-password-form/update-password-form.component';

import { User } from '../../models';
import { UserService } from 'src/app/services';


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
  ) { }

  ngOnInit() { }

  onUpdatePassword() {
    this.dialog.open(UpdatePasswordFormComponent, {
      width: '300px'
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
        this.user = user;
      }
    });
  }
}
