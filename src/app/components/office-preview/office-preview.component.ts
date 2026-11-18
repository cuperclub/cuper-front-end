import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { NgIf } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-office-preview',
    templateUrl: './office-preview.component.html',
    styleUrls: ['./office-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgIf, MapComponent, MatButton, TranslateModule]
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
