import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';

@Component({
  selector: 'cuper-input-transaction-form',
  templateUrl: './input-transaction-form.component.html',
  styleUrls: ['./input-transaction-form.component.scss']
})
export class InputTransactionFormComponent {

  constructor(
    public dialogRef: MatDialogRef<CompanyCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

}
