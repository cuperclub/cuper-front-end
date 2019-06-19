import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../../models';
import { CompanyService} from 'src/app/services';
import { CompanyDialogComponent } from '../company-dialog/company-dialog.component';
import { UserService } from 'src/app/services';

@Component({
  selector: 'cuper-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  company: Company = {};
  @Input() disableEvents: boolean = false;
  @Output() propagateCompanyData = new EventEmitter<Company>();

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.companyService.getMyCompany().subscribe(resp => {
      this.company = resp
      this.propagateCompanyData.emit(this.company);
      this.company.image = this.company.image || this.userService.getAvatar(this.company.join_at);
    });
  }

  editCompany() {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      width: '400px',
      data: {
        company: Object.assign({}, this.company)
      }
    });

    dialogRef.afterClosed().subscribe(companyData => {
      if(companyData){
        this.company = companyData;
        this.propagateCompanyData.emit(companyData);
      }
    });
  }

}
