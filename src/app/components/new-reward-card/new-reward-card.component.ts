import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from 'src/app/models';
import { OfficeService, CompanyService, PromotionService } from 'src/app/services';
import { Company } from '../../models';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { OfficeFormComponent } from '../office-form/office-form.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  defaultPromotion: Promotion = {
    title: '',
    total_rewards: 0,
    points_required: 0,
    unlimited: false,
    start_at: this.currentDate,
    end_at: this.currentDate,
    office: {}
  };
  myCompany: Company;
  myOffices: OptionSquare[] = [];
  isEditRoute: boolean = false;
  officeSelected: OptionSquare;
  uploadFile: FileOptions;
  rewardFormGroup: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private companyService: CompanyService,
    private promotionService: PromotionService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
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
    this.rewardFormGroup = this._formBuilder.group({
      title: [this.defaultPromotion.title, [Validators.required]],
      terms: [this.defaultPromotion.terms, []],
      total_rewards: [this.defaultPromotion.total_rewards, [Validators.required]],
      points_required: [this.defaultPromotion.points_required, [Validators.required]],
      unlimited: [this.defaultPromotion.unlimited, []],
      start_at: [this.defaultPromotion.start_at, [Validators.required]],
      end_at: [this.defaultPromotion.end_at, [Validators.required]],
      office_id: [this.defaultPromotion.office.id, [Validators.required]],
    });
    if(rewardId){
      this.isEditRoute = true;
      this.promotionService.getPromotion(rewardId).subscribe(reward => {
        this.officeSelected = this.myOffices.find(office => office.id === reward.office.id);
        reward.start_at = new Date(reward.start_at);
        reward.end_at = new Date(reward.end_at);
        const currentReward = Object.assign(this.defaultPromotion, reward);
        this.rewardFormGroup = this._formBuilder.group({
          title: [currentReward.title, [Validators.required]],
          terms: [currentReward.terms, []],
          total_rewards: [currentReward.total_rewards, [Validators.required]],
          points_required: [currentReward.points_required, [Validators.required]],
          unlimited: [currentReward.unlimited, []],
          start_at: [currentReward.start_at, []],
          end_at: [currentReward.end_at, []],
          office_id: [currentReward.office.id, []],
        });
      });
    }else {
      this.officeSelected = {};
    }
  }

  onSubmitReward() {
    if(this.officeSelected.hasOwnProperty('id')){
      if(this.isEditRoute){
        this.editReward();
      }else {
        this.saveReward();
      }
    }else {
      this.translate.get('reward.office_required').subscribe((message: string) => {
        this.message.open(message, '', {
          duration: 2000
        });
      });
    }
  }

  onRedirectPage() {
    const rewardId = parseInt(this.route.snapshot.paramMap.get('rewardId'));
    if(this.isEditRoute){
      this.router.navigate(['home/company/reward/details/', rewardId])
    } else {
      this.router.navigate(['home/company/reward/list']);
    }
  }

  saveReward() {
    const inputPromotion = this.getPromotionFormData(this.rewardFormGroup.value);
    this.promotionService.createPromotion(inputPromotion, this.officeSelected.id)
    .subscribe(
      () =>    this.onSuccess('common.messages.created'),
      error =>  this.onError(error)
    );
  }

  editReward() {
    const inputPromotion = this.getPromotionFormData(this.rewardFormGroup.value);
    const rewardId = parseInt(this.route.snapshot.paramMap.get('rewardId'));
    this.promotionService.updatePromotion(inputPromotion, rewardId, this.officeSelected.id)
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
      this.onRedirectPage();
    });
  }

  onError(resp): void {
    for (let key in resp.error) {
      this.rewardFormGroup.controls[key].setErrors({'backendError': resp.error[key]});
    }
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
    const totalRewardsAction = resp.checked ? 'disable' : 'enable';
    this.rewardFormGroup.controls.total_rewards[totalRewardsAction]();
    const totalRewardsValue = resp.checked ? undefined : this.rewardFormGroup.controls.total_rewards.value;
    this.rewardFormGroup.controls.total_rewards.setValue(totalRewardsValue);
  }

  onChangeStartTime = (startTime) => {
    if(startTime.value){
      const endAtValue = (this.rewardFormGroup.value.end_at.valueOf() < startTime.value.valueOf()) ? startTime.value : this.rewardFormGroup.value.end_at;
      this.rewardFormGroup.controls.end_at.setValue(endAtValue);
    }
  }

}
