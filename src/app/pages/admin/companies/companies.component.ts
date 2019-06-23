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
  companySelected: Company = {};

  constructor(
    private companyService: AdminCompanyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(resp => {
      this.companies = resp['companies'].map(company => {
        return {
          id: company.id,
          title: company.business_name,
          description: `Owner: ${company.legal_representative}`,
          image: null,
          number: null,
          data: company
        };
      });
      this.companySelected = resp['companies'][0];
      this.companySelected.logo = this.getAvatar(this.companySelected);
    });
  }


  selectCompany = (company) => {
    this.companySelected = company.data;
    this.companySelected.logo = this.getAvatar(company);
  };

  approve() {
    this.companyService.approveCompany(
      this.companySelected
    ).subscribe(resp => {
      this.companySelected = resp;
    });
  }

  getAvatar(company) {
    return company.logo || this.userService.getAvatar(company.join_at);
  }
}
