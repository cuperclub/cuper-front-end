import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';

@Component({
  selector: 'cuper-office-preview',
  templateUrl: './office-preview.component.html',
  styleUrls: ['./office-preview.component.scss']
})
export class OfficePreviewComponent {

  constructor(
    public dialogRef: MatDialogRef<CompanyCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onListerMapPosition(coordinates){
    console.log('current position', coordinates);
  }

}
