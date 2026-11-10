import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { InputTransactionService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UtilsService } from 'src/app/services';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatHint } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'cuper-input-transaction-form',
    templateUrl: './input-transaction-form.component.html',
    styleUrls: ['./input-transaction-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, MatFormField, MatInput, MatHint, MatDialogActions, MatButton, MatDialogClose, TranslateModule]
})
export class InputTransactionFormComponent {

  constructor(
    private transactionService: InputTransactionService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private utilsService: UtilsService,
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
    const errors = resp.error ? this.utilsService.formatErrorsAsObject(resp.error) : resp.errors;
    this.message.open(errors, '', {
      duration: 2000
    });
  }
}
