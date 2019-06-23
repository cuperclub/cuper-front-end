import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCompanyService, UserService } from '../../../services';
import { Company } from '../../../models';

@Component({
  selector: 'cuper-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  companiesObject: any = {};
  companySelected: any;

  constructor(
    private companyService: AdminCompanyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(resp => {
      console.log(resp);
      this.companies = resp['companies'].map(company => {
        this.companiesObject[company.id] = company;
        return {
          id: company.id,
          title: company.business_name,
          description: `Owner: ${company.legal_representative}`,
          image: null,
          number: null,
        };
      });
      this.companySelected = resp['companies'][0];
    });
  }

  selectCompany = (company) => this.companySelected = this.companiesObject[company.id];

  approve() {
    this.companyService.approveCompany(
      this.companySelected.id
    ).subscribe(company => {
      this.companySelected = company;
    });
  }
}
