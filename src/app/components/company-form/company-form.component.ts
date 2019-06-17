import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Company } from '../../models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'cuper-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit{
  @Input() company: Company = {};
  @Input() companyFormGroup: FormGroup;
  @Output() propagateFormCompany = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    const defaultCompany: Company = {
      legal_representative: '',
      business_name: '',
      ruc: '',
      slogan: '',
      contributor_type: '',
      economic_activity: ''
    };
    const currentOffice = Object.assign(defaultCompany, this.company);
    const defaultFormControl = this.fb.group({
      legal_representative: [currentOffice.legal_representative, [Validators.required]],
      business_name: [currentOffice.business_name, [Validators.required]],
      ruc: [currentOffice.ruc, [Validators.required]],
      slogan: [defaultCompany.slogan],
      contributor_type: [defaultCompany.contributor_type],
      economic_activity: [defaultCompany.economic_activity]
    });
    this.companyFormGroup = this.companyFormGroup || defaultFormControl;
  }

  onSubmit = () => this.propagateFormCompany.emit(this.companyFormGroup.value);
}
