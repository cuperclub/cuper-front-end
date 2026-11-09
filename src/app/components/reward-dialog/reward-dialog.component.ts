import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { PromotionsComponent } from 'src/app/pages/customer/promotions/promotions.component';
import { Promotion } from 'src/app/models';

@Component({
  selector: 'cuper-reward-dialog',
  templateUrl: './reward-dialog.component.html',
  styleUrls: ['./reward-dialog.component.scss']
})
export class RewardDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Promotion,
    public dialogRef: MatDialogRef<PromotionsComponent>,
  ) { }

  ngOnInit(){
  }
}
