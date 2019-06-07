import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

import { User } from '../../models';


@Component({
  selector: 'cuper-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
  @Input() user: User;

  constructor(
    private dialog: MatDialog
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

    dialogRef.beforeClosed().subscribe(user => {
      if(user){
        this.user = user;
      }
    });
  }
}
