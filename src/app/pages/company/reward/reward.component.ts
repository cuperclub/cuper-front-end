import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from '../../../services';
import { Promotion } from '../../../models';
import { ColumnDefinition, TableComponent } from '../../../components/table/table.component';
import { DatetimeCellComponent, UserCellComponent } from '../../../components/table/partials';
import { RewardCardComponent } from '../../../components/reward-card/reward-card.component';
import { MatCard } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-reward',
    templateUrl: './reward.component.html',
    styleUrls: ['./reward.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RewardCardComponent, MatCard, NgIf, TableComponent, TranslateModule]
})
export class RewardComponent implements OnInit {
  reward: Promotion;
  columnsOutputTransaction: ColumnDefinition[];
  outputTransactions: object [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.columnsOutputTransaction = [
      {
        label: 'user',
        displayName: 'Cliente',
        component: UserCellComponent
      },
      {
        label: 'created_at',
        displayName: 'Fecha',
        component: DatetimeCellComponent
      }
    ];
    const rewardId = parseInt(this.route.snapshot.paramMap.get('rewardId'));
    if(rewardId){
      this.promotionService.getPromotion(rewardId).subscribe(reward => {
        this.reward = reward;
      });
      this.promotionService.getOutputsTransaction(rewardId).subscribe(resp => this.outputTransactions = resp['transaction_outputs']);
    }
  }

  onEditReward = () => this.router.navigate(['home/company/reward/edit/', this.reward.id]);

}
