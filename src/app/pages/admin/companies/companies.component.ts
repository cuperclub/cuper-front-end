import { Component, OnInit } from '@angular/core';
import { AdminCompanyService, UtilsService } from '../../../services';
import { Company } from '../../../models';

@Component({
  selector: 'cuper-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  companySelected: Company = {};
  optionsStatus: any = [];
  indexSelected: number = -1;

  constructor(
    private companyService: AdminCompanyService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(resp => {
      this.companies = resp['companies'].map(company => {
        return this.formatData(company);
      });
      this.companySelected = resp['companies'][0];
      this.companySelected.logo = this.getAvatar(this.companySelected);
      this.optionsBuild();
    });
  }

  formatData(company) {
    return {
      id: company.id,
      title: company.business_name,
      description: `Owner: ${company.legal_representative}`,
      image: null,
      number: null,
      data: company
    }
  }

  optionsBuild () {
    let currentStatus = this.companySelected['status'];

    this.optionsStatus = [
      {
        key: 'admin.companies.request.approve',
        icon: 'check_circle',
        onClick: () => this.changeStatus('approved'),
        disabled: currentStatus === 'approved'
      },
      {
        key: 'admin.companies.request.disable',
        icon: 'domain_disabled',
        onClick: () => this.changeStatus('disabled'),
        disabled: (currentStatus === 'disabled') || (currentStatus === 'pending')
      },
      {
        key: 'admin.companies.request.decline',
        icon: 'thumb_down_alt',
        onClick: () => this.changeStatus('decline'),
        disabled: (currentStatus === 'decline') || (currentStatus === 'disabled') || (currentStatus === 'approved')
      },
      // {
      //   key: 'admin.companies.request.remove',
      //   icon: 'remove_circle',
      //   onClick: () => this.changeStatus('remove'),
      //   disabled: false
      // },
    ]
  }


  selectCompany = (company, index) => {
    this.indexSelected = index;
    this.companySelected = company.data;
    this.companySelected.logo = this.getAvatar(company);
    this.optionsBuild();
  };

  changeStatus(status){
    this.companyService.changeStatusCompany(
      this.companySelected,
      status
    ).subscribe(resp => {
      this.companySelected = resp;
      this.companies[this.indexSelected] = this.formatData(this.companySelected);
    });
  }

  getAvatar(company) {
    return company.logo || this.utilsService.getAvatar(company.join_at);
  }
}
