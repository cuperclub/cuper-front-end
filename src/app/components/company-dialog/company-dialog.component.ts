import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from '../../services';
import { Company } from '../../models';

@Component({
  selector: 'cuper-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CompanyCardComponent>,
    private companyService: CompanyService,
    private message: MatSnackBar,
    private translate: TranslateService,
  ) {}

  ngOnInit() {}

  onSubmitCompany() {
    const inputCompany = this.data.company || {};
    let companyToSave: Company = Object.assign({}, inputCompany);
    this.editCompany(companyToSave);
  }

  editCompany(company) {
    this.companyService.updateMyCompany(company)
    .subscribe(
      (resp) => this.onSuccess(resp, 'common.messages.updated'),
      error =>  this.onError(error)
    );
  }

  onSuccess(resp: object, message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    this.message.open(resp.errors, '', {
      duration: 2000
    });
  }

}
