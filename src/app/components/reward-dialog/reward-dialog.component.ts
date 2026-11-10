import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionsComponent } from 'src/app/pages/customer/promotions/promotions.component';
import { Promotion } from 'src/app/models';

@Component({
    selector: 'cuper-reward-dialog',
    templateUrl: './reward-dialog.component.html',
    styleUrls: ['./reward-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RewardDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Promotion,
    public dialogRef: MatDialogRef<PromotionsComponent>,
  ) { }

  ngOnInit(){
  }
}
