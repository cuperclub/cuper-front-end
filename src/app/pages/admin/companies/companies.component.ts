import { Component, OnInit } from '@angular/core';
import { AdminCompanyService, UtilsService } from '../../../services';
import { Company } from '../../../models';
import {FeedbackFormComponent} from '../../../components/feedback-form/feedback-form.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cuper-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  companySelected: Company = {};
  optionsStatus: any = [];
  indexSelected: number = 0;

  constructor(
    private companyService: AdminCompanyService,
    private utilsService: UtilsService,
    private dialog: MatDialog
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
        onClick: () => this.sendFeedback('approved'),
        disabled: currentStatus === 'approved'
      },
      {
        key: 'admin.companies.request.disable',
        icon: 'domain_disabled',
        onClick: () => this.sendFeedback('disabled'),
        disabled: (currentStatus === 'disabled') || (currentStatus === 'pending')
      },
      {
        key: 'admin.companies.request.decline',
        icon: 'thumb_down_alt',
        onClick: () => this.sendFeedback('decline'),
        disabled: (currentStatus === 'decline') || (currentStatus === 'disabled') || (currentStatus === 'approved')
      }
    ]
  }

  sendFeedback(status){
    const dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '300px',
      data: {
        status: status,
        feedback: '',
        company: this.companySelected
      }
    });

    dialogRef.beforeClosed().subscribe(company => {
      if(company){
        this.companySelected = company;
        this.companies[this.indexSelected] = this.formatData(company);
      }
    });
  }

  selectCompany = (company, index) => {
    this.indexSelected = index;
    this.companySelected = company.data;
    this.companySelected.logo = this.getAvatar(company);
    this.optionsBuild();
  };

  getAvatar(company) {
    return company.logo || this.utilsService.getAvatar(company.join_at);
  }
}
