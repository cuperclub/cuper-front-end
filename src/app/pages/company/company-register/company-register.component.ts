import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CompanyService } from '../../../services'
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
    private translate: TranslateService
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
    this.plans = [
      {
        price: 0,
        time: '3 meses',
        promotion: 'Gratis'
      },
      {
        price: 4.99,
        time: 'mensual'
      },
      {
        price: 19.99,
        time: '6 meses',
        promotion: 'Ahorra $20'
      },
      {
        price: 30,
        time: 'anual',
        promotion: 'Ahorra $30'
      }
    ];
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
      () =>    this.onSuccess('company.validating'),
      error =>  this.onError(error)
    );
  }

  onSuccess(message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.router.navigate(['home/dashboard']);
    });
  }

  onError(resp): void {
    this.message.open(resp.errors, '', {
      duration: 2000
    });
  }
}
