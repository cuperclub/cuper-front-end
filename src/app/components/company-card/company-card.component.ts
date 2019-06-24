import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../../models';
import { CompanyService} from 'src/app/services';
import { CompanyDialogComponent } from '../company-dialog/company-dialog.component';
import { UtilsService } from 'src/app/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cuper-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  company: Company = {};
  isLodingImage: boolean = false;

  @Input() disableEvents: boolean = false;
  @Output() propagateCompanyData = new EventEmitter<Company>();

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private utilsService: UtilsService,
    private message: MatSnackBar,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.companyService.getMyCompany().subscribe(resp => {
      this.company = resp
      this.propagateCompanyData.emit(this.company);
      this.company.logo_url = this.company.image || this.utilsService.getAvatar(this.company.join_at);
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

  onListenerFile(uploadFile){
    this.isLodingImage = true;
    let input = new FormData();
    input.append('logo', uploadFile.file);
    this.companyService.updateMyCompany(input).subscribe(
      (resp) => this.onSuccess(resp),
      error => this.onError(error)
    );
  }

  onSuccess(resp): void {
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.isLodingImage = false;
    });
  }

  onError(resp): void {
    let errors = resp.error ? resp.error.errors : {};
    this.message.open(errors, '', {
      duration: 2000
    });
  }

}
