import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Promotion } from 'src/app/models';
import { PromotionService } from 'src/app/services';
import { RewardDialogComponent } from 'src/app/components/reward-dialog/reward-dialog.component';

@Component({
  selector: 'cuper-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promotions$: Observable<Promotion[]>;

  constructor(
    private promotionService: PromotionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.promotions$ = this.promotionService.getPublicPromotions();
  }

  onShowDetails = (reward) => {
    this.dialog.open(RewardDialogComponent, {
      width: '400px',
      data: reward
    });
  }

}
