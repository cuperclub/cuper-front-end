import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PromotionsComponent } from 'src/app/pages/customer/promotions/promotions.component';
import { Promotion } from 'src/app/models';
import { RewardCardComponent } from '../reward-card/reward-card.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-reward-dialog',
    templateUrl: './reward-dialog.component.html',
    styleUrls: ['./reward-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RewardCardComponent, MatDialogActions, MatButton, MatDialogClose, TranslateModule]
})
export class RewardDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Promotion,
    public dialogRef: MatDialogRef<PromotionsComponent>,
  ) { }

  ngOnInit(){
  }
}
