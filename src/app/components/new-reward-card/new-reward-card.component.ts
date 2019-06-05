import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models';
import { OfficeService, CompanyService} from 'src/app/services';
import { Company, Office } from '../../models';
import { Observable, of } from 'rxjs';

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
  myOffices: OptionSquare[];

  constructor(
    private officeService: OfficeService,
    private companyService: CompanyService
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
  }

  onSaveReward() {
    console.log('this.reward', this.reward);
  }

  onSelectOffice(office) {
    console.log('office', office);
  }

}
