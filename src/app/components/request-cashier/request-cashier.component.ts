import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardCashierComponent } from '../../components/card-cashier/card-cashier.component';
import { User } from '../../models';
import { CompanyService } from 'src/app/services';
import { ButtonOption } from '../../components/user-search/user-search.component';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cuper-request-cashier',
  templateUrl: './request-cashier.component.html',
  styleUrls: ['./request-cashier.component.scss']
})
export class RequestCashierComponent implements OnInit{
  emailInvitation: string;
  currentUser: User;
  rightButton: ButtonOption;
  leftButton: ButtonOption;

  constructor(
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<CardCashierComponent>,
    private translate: TranslateService,
    private message: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.rightButton = {
      action: this.onSendInvitation,
      label: 'common.send_invitation'
    };
    this.leftButton = {
      action: this.closeDialog,
      label: 'common.cancel'
    };
  }

  onListerUserSearch(user) {
    this.currentUser = user;
  }

  onSendInvitation = () => {
    if (this.emailInvitation) {
      this.companyService.sendInvitationEmployee(this.emailInvitation).subscribe(data => {
        this.dialogRef.close();
      });
    } else {
      this.companyService.sendRequestEmployee(this.currentUser.id).subscribe(() => {
        this.translate.get('common.messages.sent').subscribe((message: string) => {
          this.message.open(message, '', {
            duration: 2000
          });
          this.dialogRef.close();
        });
      });
    }
  }

  closeDialog = () => {
    this.dialogRef.close();
  }
}
