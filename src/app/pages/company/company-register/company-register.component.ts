import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Company } from '../../../models'
import { OptionPlan } from '../../../components/card-plan/card-plan.component';

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.companyFormGroup = this._formBuilder.group({
      legal_representative: ['', Validators.required],
      business_name: ['', Validators.required],
      ruc: ['', Validators.required],
      slogan: [''],
      contributor_type: [''],
      economic_activity: ['']
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
    console.log('register company', this.companyFormGroup.value);
    console.log('plan selected', this.planSelected);
  }
}
