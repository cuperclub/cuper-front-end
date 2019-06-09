import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from 'src/app/models';
import { OfficeService, CompanyService, PromotionService } from 'src/app/services';
import { Company } from '../../models';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

interface OptionSquare {
  description?: string
  title?: string
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
  isEditRoute: boolean = false;
  officeSelected: OptionSquare;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private companyService: CompanyService,
    private promotionService: PromotionService,
    private message: MatSnackBar,
    private translate: TranslateService
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
        this.isEditRoute = true;
        this.promotionService.getPromotion(rewardId).subscribe(reward => {
          this.reward = reward;
          this.officeSelected = this.myOffices.find(office => office['id'] === reward['office'].id);
        });
      }else {
        this.officeSelected = {};
      }
    });
  }

  onSubmitReward() {
    if(this.isEditRoute){
      this.editReward();
    }else {
      this.saveReward();
    }
  }

  saveReward() {
    this.promotionService.createPromotion(this.reward, this.officeSelected['id'])
    .subscribe(
      () =>    this.onSuccess('common.messages.created'),
      error =>  this.onError(error)
    );
  }

  editReward() {
    this.promotionService.updatePromotion(this.reward, this.officeSelected['id'])
    .subscribe(
      () =>    this.onSuccess('common.messages.updated'),
      error =>  this.onError(error)
    );
  }

  onSelectOffice = (office) => this.officeSelected = office ? office : {};

  onSuccess(message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.router.navigate(['home/rewards']);
    });
  }

  onError(resp): void {
    this.message.open(resp.errors, '', {
      duration: 2000
    });
  }

  onNewOffice() {
    console.log('launch new office modal')
  }

}
