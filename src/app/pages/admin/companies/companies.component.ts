import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminCompanyService, UtilsService } from '../../../services';
import { Company } from '../../../models';
import {FeedbackFormComponent} from '../../../components/feedback-form/feedback-form.component'
import { MatDialog } from '@angular/material/dialog';
import { NgIf, NgFor } from '@angular/common';
import { TableCardComponent } from '../../../components/table-card/table-card.component';
import { MatCard } from '@angular/material/card';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgIf, TableCardComponent, MatCard, AvatarComponent, MatIconButton, MatMenuTrigger, MatIcon, MatMenu, NgFor, MatMenuItem, TranslateModule]
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  companySelected: Company | null = null;
  optionsStatus: any = [];
  indexSelected: number = 0;

  constructor(
    private companyService: AdminCompanyService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(resp => {
      const companies = resp['companies'] || [];
      this.companies = companies.map(company => {
        return this.formatData(company);
      });
      this.companySelected = companies[0] || null;
      if (this.companySelected) {
        this.companySelected.logo = this.getAvatar(this.companySelected);
        this.optionsBuild();
      }
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
    let currentStatus = this.companySelected?.['status'];

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
        onClick: () => this.sendFeedback('declined'),
        disabled: (currentStatus === 'declined') || (currentStatus === 'disabled') || (currentStatus === 'approved')
      }
    ]
  }

  sendFeedback(status){
    const dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '300px',
      data: {
        status: status,
        feedback: '',
        entity: this.companySelected
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
