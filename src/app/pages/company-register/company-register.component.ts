import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyService, UserService, AdminPlanService } from '../../services'
import { OptionPlan, CardPlanComponent } from '../../components/card-plan/card-plan.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatCard } from '@angular/material/card';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CompanyFormComponent } from '../../components/company-form/company-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
    selector: 'cuper-company-register',
    templateUrl: './company-register.component.html',
    styleUrls: ['./company-register.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, NgIf, MatStepper, MatStep, FormsModule, ReactiveFormsModule, MatStepLabel, MatInput, NgFor, CardPlanComponent, MatButton, MatStepperNext, MatIcon, CompanyFormComponent, MatStepperPrevious, LoaderComponent, KeyValuePipe, TranslateModule]
})
export class CompanyRegisterComponent implements OnInit {
  planFormGroup: UntypedFormGroup;
  companyFormGroup: UntypedFormGroup;

  plans: OptionPlan [];
  planSelected: OptionPlan;
  isUserNew: boolean = false;
  loaded: boolean = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private userService: UserService,
    private planService: AdminPlanService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.companyFormGroup = this._formBuilder.group({
      legal_representative: ['', Validators.required],
      business_name: ['', Validators.required],
      ruc: ['', Validators.required],
      slogan: [''],
      contributor_type: [''],
      economic_activity: [''],
      category_id: ['', Validators.required]
    });

    this.isUserNew = this.userService.getCurrentUserData().companies.length === 0;

    this.planService.getPlans().subscribe(data => {
      const defaultPlan = {
        price: 0,
        time: '',
        id: null
      };
      const plans = data['plans'] || [];
      const promotional_plan = data['promotional_plan'] || defaultPlan;
      this.plans = this.planService.plansAvailablesForCard(plans);
      this.planSelected = this.planService.planForCard(promotional_plan);
      this.planFormGroup = this._formBuilder.group({
        id: [this.planSelected.id, Validators.required]
      });
      this.loaded = true;
      this.changeDetector.markForCheck();
    });
  }

  onListenerPlan(plan) {
    this.planSelected = plan;
    this.planFormGroup = this._formBuilder.group({
      id: [this.planSelected.id, Validators.required]
    });
  }

  isSelectedPlan = (plan) => plan === this.planSelected;

  onSubmitCompany(stepper: MatStepper) {
    this.companyService.registerMyCompany(this.companyFormGroup.value, this.planFormGroup.value.id).subscribe(
      (resp) => this.onSuccess('company.validating', resp),
      error =>  this.onError(error, stepper)
    );
  }

  onSuccess(message: string, company): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      const currentUser = this.userService.getCurrentUserData();
      currentUser.is_partner = true;
      currentUser.current_company_id = company.id;
      const formatCompany = {
        id: company.id,
        join_at: company.join_at,
        name: company.business_name,
        role: 'partner',
        status: 'pending'
      };
      if(currentUser.companies) {
        currentUser.companies.push(formatCompany);
      }else {
        currentUser.companies = [formatCompany];
      }
      this.userService.updateCurrentUserData(currentUser);
      this.router.navigate(['home']);
    });
  }

  onError(resp, stepper): void {
    for (let key in resp.error) {
      this.companyFormGroup.controls[key].setErrors({'backendError': resp.error[key]});
    }
    stepper.previous();
    this.changeDetector.markForCheck();
  }
}
