import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from '../../../services';
import { Promotion } from '../../../models';
import { ColumnDefinition } from '../../../components/table/table.component';
import { DatetimeCellComponent, UserCellComponent } from '../../../components/table/partials';

@Component({
  selector: 'cuper-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
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

    this.route.paramMap.subscribe(params => {
      const rewardId = parseInt(params.get('rewardId'));
      if(rewardId){
        this.promotionService.getPromotion(rewardId).subscribe(reward => {
          this.reward = reward;
        });
        this.promotionService.getOutputsTransaction(rewardId).subscribe(resp => this.outputTransactions = resp['transaction_outputs']);
      }
    });
  }

  onEditReward = () => this.router.navigate(['home/company/reward/edit/', this.reward.id]);

}
