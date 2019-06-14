import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../../models';
import { CompanyService} from 'src/app/services';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

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
    private message: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.companyService.getMyCompany(1).subscribe(resp => {
      this.company = resp
      this.propagateCompanyData.emit(this.company);
    });
  }

  editCompany() {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      width: '400px',
      data: {
        company: Object.assign({}, this.company)
      }
    });

    dialogRef.afterClosed().subscribe(companyData => {
      if(companyData){
        this.companyService.updateMyCompany(companyData).subscribe(
          (resp) => {
            this.translate.get('common.messages.updated').subscribe((message: string) => {
              this.message.open(message, '', {
                duration: 2000
              });
              this.company = resp;
            });
          },
          ({ error }) => {
            this.message.open(error.errors, '', {
              duration: 2000
            });
          }
        );
      }
    });
  }

}
