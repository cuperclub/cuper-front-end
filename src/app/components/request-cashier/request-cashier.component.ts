import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardCashierComponent } from '../../components/card-cashier/card-cashier.component';
import { User } from '../../models';

@Component({
  selector: 'cuper-request-cashier',
  templateUrl: './request-cashier.component.html',
  styleUrls: ['./request-cashier.component.scss']
})
export class RequestCashierComponent {
  emailInvitation: string;
  currentUser: User;

  constructor(
    private dialogRef: MatDialogRef<CardCashierComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onListerUserSearch(user) {
    this.currentUser = user;
  }

  onSendInvitation() {
    this.dialogRef.close({});
  }
}
