import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from '../../../services';
import { Promotion } from '../../../models';

@Component({
  selector: 'cuper-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  reward: Promotion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rewardId = parseInt(params.get('rewardId'));
      if(rewardId){
        this.promotionService.getPromotion(rewardId).subscribe(reward => {
          this.reward = reward;
        });
      }
    });
  }

  onEditReward = () => this.router.navigate(['home/company/reward/edit/', this.reward.id]);

}
