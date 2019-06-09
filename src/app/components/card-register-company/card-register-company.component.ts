import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../../models';
import { CompanyService} from 'src/app/services';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cuper-card-register-company',
  templateUrl: './card-register-company.component.html',
  styleUrls: ['./card-register-company.component.scss']
})
export class CardRegisterCompanyComponent implements OnInit {
  company: Company = {};

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private message: MatSnackBar,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  registerCompany() {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      width: '400px',
      data: {
        company: Object.assign({}, this.company)
      }
    });

    dialogRef.afterClosed().subscribe(companyData => {
      if(companyData){
        companyData.category_id = 1;
        this.companyService.registerMyCompany(companyData).subscribe(
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
