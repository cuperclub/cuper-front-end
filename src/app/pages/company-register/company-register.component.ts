import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CompanyService, UserService, AdminPlanService } from '../../services'
import { OptionPlan } from '../../components/card-plan/card-plan.component';
import { MatSnackBar, MatStepper } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cuper-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {
  planFormGroup: FormGroup;
  companyFormGroup: FormGroup;

  plans: OptionPlan [];
  planSelected: OptionPlan;
  isUserNew: boolean = false;
  loaded: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private userService: UserService,
    private planService: AdminPlanService
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
      this.userService.observerData.next(currentUser);
      this.userService.userDataEdited = currentUser;
      this.router.navigate(['home']);
    });
  }

  onError(resp, stepper): void {
    for (let key in resp.error) {
      this.companyFormGroup.controls[key].setErrors({'backendError': resp.error[key]});
    }
    stepper.previous();
  }
}
