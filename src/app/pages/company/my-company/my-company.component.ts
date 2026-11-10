import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '../../../models';
import { CompanyCardComponent } from '../../../components/company-card/company-card.component';
import { BillingCardComponent } from '../../../components/billing-card/billing-card.component';
import { CardOfficeComponent } from '../../../components/card-office/card-office.component';
import { CardCashierComponent } from '../../../components/card-cashier/card-cashier.component';

@Component({
    selector: 'cuper-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CompanyCardComponent, BillingCardComponent, CardOfficeComponent, CardCashierComponent]
})
export class MyCompanyComponent implements OnInit {
  myCompany: Company;
  constructor() { }

  ngOnInit() {
  }

  onListerCompanyData(company){
    this.myCompany = company;
  }
}
