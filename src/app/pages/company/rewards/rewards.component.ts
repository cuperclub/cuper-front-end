import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from '../../../services';
import { Promotion } from '../../../models';
import { PaginationDefinition } from '../../../components/table/table.component';

@Component({
  selector: 'cuper-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  myRewards: Promotion[];
  lastRewards: Promotion[];
  pagniationOptions: PaginationDefinition;

  constructor(
    private router: Router,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    const initPage = 1;
    const initItemsPerPage = 5;
    this.promotionService.getMyPromotions(initPage, initItemsPerPage).subscribe(resp => {
      this.myRewards = this.formatData(resp);
      this.lastRewards = this.myRewards.slice(0, 5);
      this.pagniationOptions = {
        length: resp['meta'].total_count,
        pageSize: initItemsPerPage,
        pageSizeOptions: [5, 10, 25, 100],
        pageEvent
      };
    });

    const pageEvent = (paginationData) => {
      const currentPage = paginationData.pageIndex + 1;
      const items_per_page = paginationData.pageSize;
      this.promotionService.getMyPromotions(currentPage, items_per_page).subscribe(resp => {
        this.myRewards = this.formatData(resp);
      });
    };
  }

  formatData = (data) => {
    return data['promotions'].map(reward => {
      return {
        id: reward.id,
        title: reward.title,
        description: reward.description,
        image: reward.image_url,
        number: reward.points_required,
        text: 'pts'
      };
    });

  }

  onNewReward = () => this.router.navigateByUrl('home/company/reward/new');

  onEditReward = (reward) => this.router.navigate(['home/company/reward/details', reward.id]);
}
