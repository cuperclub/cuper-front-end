import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CompanyService, UserService, AdminPlanService } from '../../../services'
import { OptionPlan } from '../../../components/card-plan/card-plan.component';
import { MatSnackBar } from '@angular/material';
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

    this.planService.getPlans().subscribe(data => {
      const plans = data['plans'] || [];
      this.plans = this.planService.plansAvailablesForCard(plans);
    });

    const defaultPlan = {
      price: 0,
      time: '',
    };

    this.planSelected = this.isUserNew ? this.plans[0] : defaultPlan;
    this.planFormGroup = this._formBuilder.group({
      selectPlan: [this.planSelected.time, Validators.required]
    });
  }

  onListenerPlan(plan) {
    this.planSelected = plan;
    this.planFormGroup = this._formBuilder.group({
      selectPlan: [this.planSelected.time, Validators.required]
    });
  }

  isSelectedPlan = (plan) => plan === this.planSelected;

  onSubmitCompany() {
    this.companyService.registerMyCompany(this.companyFormGroup.value).subscribe(
      (resp) => this.onSuccess('company.validating', resp),
      error =>  this.onError(error)
    );
  }

  onSuccess(message: string, company): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      const currenUser = this.userService.getDataOnLocalStorage();
      const formatCompany = {
        id: company.id,
        join_at: company.join_at,
        name: company.business_name,
        role: 'partner',
        status: 'pending'
      }
      if(currenUser.companies) {
        currenUser.companies.push(formatCompany);
      }else {
        currenUser.companies = [formatCompany];
      }
      // this.userService.saveDataOnLocalStorage(currenUser);
      this.router.navigate(['home/dashboard']);
    });
  }

  onError(resp): void {
    this.message.open(resp.errors, '', {
      duration: 2000
    });
  }
}
