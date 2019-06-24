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
  lastRewards: Promotion[];

  constructor(
    private router: Router,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.promotionService.getMyPromotions().subscribe(resp => {
      this.myRewards = resp['promotions'].map(reward => {
        return {
          id: reward.id,
          title: reward.title,
          description: reward.description,
          image: reward.image_url,
          number: reward.points_required,
          text: 'pts'
        };
      });
      this.lastRewards = this.myRewards.slice(0, 10);
    });
  }

  onNewReward = () => this.router.navigate(['home/rewards/new']);

  onEditReward = (reward) => this.router.navigate(['home/rewards/details', reward.id]);
}
