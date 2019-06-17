import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from '../../services';
import { Company } from '../../models';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'cuper-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent implements OnInit {
  companyFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CompanyCardComponent>,
    private companyService: CompanyService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    const defaultCompany: Company = {
      legal_representative: '',
      business_name: '',
      ruc: '',
      slogan: '',
      contributor_type: '',
      economic_activity: '',
      category_id: 0,
      category: {}
    };
    const currentOffice = Object.assign(defaultCompany, this.data.company);
    this.companyFormGroup = this._formBuilder.group({
      legal_representative: [currentOffice.legal_representative, [Validators.required]],
      business_name: [currentOffice.business_name, [Validators.required]],
      ruc: [currentOffice.ruc, [Validators.required]],
      slogan: [defaultCompany.slogan],
      contributor_type: [defaultCompany.contributor_type],
      economic_activity: [defaultCompany.economic_activity],
      category_id: [defaultCompany.category.id || defaultCompany.category_id, Validators.required]
    });
  }

  onSubmitCompany() {
    const inputCompany = this.companyFormGroup.value || {};
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
