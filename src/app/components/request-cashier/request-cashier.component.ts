import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardCashierComponent } from '../../components/card-cashier/card-cashier.component';
import { User } from '../../models';
import { CompanyService } from 'src/app/services';

@Component({
  selector: 'cuper-request-cashier',
  templateUrl: './request-cashier.component.html',
  styleUrls: ['./request-cashier.component.scss']
})
export class RequestCashierComponent {
  emailInvitation: string;
  currentUser: User;

  constructor(
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<CardCashierComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onListerUserSearch(user) {
    this.currentUser = user;
  }

  onSendInvitation() {
    if (this.emailInvitation){
      this.companyService.sendInvitationEmployee(this.emailInvitation).subscribe(data => {
        this.dialogRef.close();
      });
    }else{
      this.companyService.sendRequestEmployee(this.currentUser.id).subscribe(data => {
        this.dialogRef.close();
      });
    }
  }
}
