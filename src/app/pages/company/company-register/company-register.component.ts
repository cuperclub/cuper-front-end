import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'cuper-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  plans: any;
  planSelected: any;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.plans = [
      {
        price: "0",
        time: "3 meses",
        promotion: "Gratis"
      },
      {
        price: "4.99",
        time: "mensual"
      },
      {
        price: "19.99",
        time: "6 meses",
        promotion: "Ahorra $20"
      },
      {
        price: "30",
        time: "anual",
        promotion: "Ahorra $30"
      },
    ]
  }

  onListenerPlan(plan) {
    this.planSelected = plan;
  }

  isSelectedPlan = (plan) => plan === this.planSelected;

}
