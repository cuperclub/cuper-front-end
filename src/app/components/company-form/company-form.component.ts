import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Company, Category } from '../../models';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services';
import { Observable } from 'rxjs';
import { MatFormField, MatInput, MatError, MatLabel } from '@angular/material/input';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatError, ControlMessagesComponent, NgIf, MatLabel, MatSelect, NgFor, MatOption, AsyncPipe, TranslateModule]
})
export class CompanyFormComponent implements OnInit{
  @Input() companyFormGroup: UntypedFormGroup;
  @Output() propagateFormCompany = new EventEmitter<any>();

  categories$: Observable<Category[]>;

  constructor(
    private fb: UntypedFormBuilder,
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
