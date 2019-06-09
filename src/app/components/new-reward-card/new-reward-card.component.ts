import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Promotion } from 'src/app/models';
import { OfficeService, CompanyService, PromotionService } from 'src/app/services';
import { Company } from '../../models';
import { Observable } from 'rxjs';

interface OptionSquare {
  description: string
  title: string
}

@Component({
  selector: 'cuper-new-reward-card',
  templateUrl: './new-reward-card.component.html',
  styleUrls: ['./new-reward-card.component.scss']
})
export class NewRewardCardComponent implements OnInit {
  reward: Promotion = {
    unlimited: false
  };
  myCompany$: Observable<Company>;
  myOffices: OptionSquare[] = [];

  constructor(
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private companyService: CompanyService,
    private promotionService: PromotionService
  ) { }

  ngOnInit() {
    this.myCompany$ = this.companyService.getMyCompany();
    this.officeService.getOffices().subscribe(resp => {
      this.myOffices = resp['offices'].map(office => {
        return {
          id: office.id,
          title: office.name,
          description: office.address
        };
      });
    });
    this.route.paramMap.subscribe(params => {
      const rewardId = parseInt(params.get('rewardId'));
      if(rewardId){
        this.promotionService.getPromotion(rewardId).subscribe(reward => {
          this.reward = reward;
        });
      }
    });
  }

  onSaveReward() {
    console.log('this.reward', this.reward);
  }

  onSelectOffice(office) {
    console.log('office', office);
  }

  onNewOffice() {
    console.log('launch new office modal')
  }

}
