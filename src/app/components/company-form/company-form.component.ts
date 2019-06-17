import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Company, Category } from '../../models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit{
  @Input() companyFormGroup: FormGroup;
  @Output() propagateFormCompany = new EventEmitter<any>();

  categories$: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const defaultFormControl = this.fb.group({
      legal_representative: ['', Validators.required],
      business_name: ['', Validators.required],
      ruc: ['', Validators.required],
      slogan: [''],
      contributor_type: [''],
      economic_activity: [''],
      category_id: ['', Validators.required]
    });
    this.companyFormGroup = this.companyFormGroup || defaultFormControl;
    this.categories$ = this.categoryService.getCategories();
  }

  onSubmit = () => this.propagateFormCompany.emit(this.companyFormGroup.value);
}
