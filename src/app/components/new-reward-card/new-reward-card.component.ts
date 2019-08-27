import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from 'src/app/models';
import { OfficeService, CompanyService, PromotionService } from 'src/app/services';
import { Company } from '../../models';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { OfficeFormComponent } from '../office-form/office-form.component';
import { MatDialog } from '@angular/material';

interface OptionSquare {
  id?: number,
  description?: string
  title?: string
}

interface FileOptions {
  file?: File;
  imageBase64?: string | ArrayBuffer;
}

@Component({
  selector: 'cuper-new-reward-card',
  templateUrl: './new-reward-card.component.html',
  styleUrls: ['./new-reward-card.component.scss']
})
export class NewRewardCardComponent implements OnInit {
  currentDate: Date = new Date();
  reward: Promotion = {
    unlimited: false,
    start_at: this.currentDate,
    end_at: this.currentDate
  };
  myCompany: Company;
  myOffices: OptionSquare[] = [];
  isEditRoute: boolean = false;
  officeSelected: OptionSquare;
  uploadFile: FileOptions;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private companyService: CompanyService,
    private promotionService: PromotionService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.companyService.getMyCompany().subscribe((resp) => this.myCompany = resp);
    this.officeService.getOffices().subscribe(resp => {
      this.myOffices = resp['offices'].map(office => {
        return {
          id: office.id,
          title: office.name,
          description: office.address
        };
      });
    });
    const rewardId = parseInt(this.route.snapshot.paramMap.get('rewardId'));
    if(rewardId){
      this.isEditRoute = true;
      this.promotionService.getPromotion(rewardId).subscribe(reward => {
        this.reward = reward;
        this.officeSelected = this.myOffices.find(office => office.id === reward.office.id);
      });
    }else {
      this.officeSelected = {};
    }
  }

  onSubmitReward() {
    if(this.isEditRoute){
      this.editReward();
    }else {
      this.saveReward();
    }
  }

  saveReward() {
    const inputPromotion = this.getPromotionFormData(this.reward);
    this.promotionService.createPromotion(inputPromotion, this.officeSelected.id)
    .subscribe(
      () =>    this.onSuccess('common.messages.created'),
      error =>  this.onError(error)
    );
  }

  editReward() {
    const inputPromotion = this.getPromotionFormData(this.reward);
    this.promotionService.updatePromotion(inputPromotion, this.reward.id, this.officeSelected.id)
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
      this.router.navigate(['home/company/reward/list']);
    });
  }

  onError(resp): void {
    this.message.open(resp.errors, '', {
      duration: 2000
    });
  }

  onNewOffice = () => {
    const dialogRef = this.dialog.open(OfficeFormComponent,{
      data: {
        companyId: this.myCompany.id
      }
    });

    dialogRef.beforeClosed().subscribe(currentOffice => {
      if(currentOffice){
        this.officeSelected = {
          id: currentOffice.id,
          title: currentOffice.name,
          description: currentOffice.address
        };
        this.myOffices.push(this.officeSelected);
      }
    });
  };

  onListenerFile = (uploadFile) => this.uploadFile = uploadFile;

  getPromotionFormData(reward){
    let input = new FormData();
    input.append('title', reward.title);
    input.append('terms', reward.terms);
    input.append('total_rewards', reward.total_rewards);
    input.append('points_required', reward.points_required);
    input.append('unlimited', reward.unlimited);
    input.append('start_at', reward.start_at);
    input.append('end_at', reward.end_at);
    if(this.uploadFile) input.append('image', this.uploadFile.file);
    return input;
  }

  onChangeTotalRewards = (resp) => {
    this.reward.total_rewards = resp.checked ? undefined : this.reward.total_rewards;
  }

  onChangeStartTime = (startTime) => {
    this.reward.end_at = (this.reward.end_at.valueOf() < startTime.value.valueOf()) ? startTime.value : this.reward.end_at;
  }

}
