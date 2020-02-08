import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { InputTransactionService } from '../../services';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cuper-input-transaction-form',
  templateUrl: './input-transaction-form.component.html',
  styleUrls: ['./input-transaction-form.component.scss']
})
export class InputTransactionFormComponent {

  constructor(
    private transactionService: InputTransactionService,
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CompanyCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onSubmitTransaction(): void {
    const inputTransaction = {
      user_id: this.data.user.id,
      points: this.data.invoice.cost
    };
    this.transactionService.create(inputTransaction)
    .subscribe(
      (resp) => this.onSuccess(resp, 'common.messages.created'),
      (error) =>  this.onError(error)
    );
  }

  onSuccess(resp: object, message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    const errors = resp.error ? this.formatError(resp.error) : resp.errors;
    this.message.open(errors, '', {
      duration: 2000
    });
  }

  formatError(error: {}) {
    let errors = [];
    const keys = Object.keys(error);
    keys.forEach((key)=>{
      let msg = `${key}: ${error[key].join(' ,')}`;
      errors.push(msg);
    });
    return errors;
  }

}
