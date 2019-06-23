import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from '../../services';
import { Company } from '../../models';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

interface FileOptions {
  file?: File;
  imageBase64?: string | ArrayBuffer;
}

@Component({
  selector: 'cuper-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent implements OnInit {
  companyFormGroup: FormGroup;
  uploadFile: FileOptions;

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
    let input = new FormData();
    input.append('legal_representative', company.legal_representative);
    input.append('business_name', company.business_name);
    input.append('ruc', company.ruc);
    input.append('slogan', company.slogan);
    input.append('contributor_type', company.contributor_type);
    input.append('economic_activity', company.economic_activity);
    input.append('category_id', company.category_id);
    if(this.uploadFile) input.append('logo', this.uploadFile.file);

    this.companyService.updateMyCompany(input)
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

  onListenerFile = (uploadFile) => this.uploadFile = uploadFile;

}
