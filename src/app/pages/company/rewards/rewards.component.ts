import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from '../../../services';
import { Promotion } from '../../../models';

@Component({
  selector: 'cuper-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  myRewards: Promotion[];

  constructor(
    private router: Router,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.promotionService.getMyPromotions().subscribe(resp => {
      this.myRewards = resp['promotions'].map(reward => {
        return {
          title: reward.title,
          description: reward.description,
          image: reward.image,
          number: reward.points_required,
          text: 'pts'
        };
      });
    });
  }

  onNewReward = () => this.router.navigate(['home/rewards/new']);
}
