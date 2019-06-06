import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardUserComponent } from '../card-user/card-user.component';

import { User } from '../../models';

@Component({
  selector: 'cuper-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {

  constructor(
    public dialogRef: MatDialogRef<CardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

}
