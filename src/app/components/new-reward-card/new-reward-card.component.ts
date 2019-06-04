import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models';
import { OfficeService, CompanyService} from 'src/app/services';

@Component({
  selector: 'cuper-new-reward-card',
  templateUrl: './new-reward-card.component.html',
  styleUrls: ['./new-reward-card.component.scss']
})
export class NewRewardCardComponent implements OnInit {
  reward: Promotion = {
    unlimited: false
  };

  constructor(
    private officeService: OfficeService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.officeService.getOffices().subscribe(resp => console.log('offices', resp));
    this.companyService.getMyCompany().subscribe(resp => console.log('my_company', resp))
  }

  onSaveReward() {
    console.log('this.reward', this.reward);
  }

}
