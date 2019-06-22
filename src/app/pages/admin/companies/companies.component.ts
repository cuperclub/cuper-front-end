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

  constructor(
    private companyService: AdminCompanyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(resp => {
      console.log(resp);
      this.companies = resp['companies'].map(company => {
        return {
          id: company.id,
          title: company.business_name,
          description: `Owner: ${company.legal_representative}`,
          image: company.logo || this.userService.getAvatar(company.join_at),
          number: 3,
          text: 'meses gratis'
        };
      });
    });
  }
}
