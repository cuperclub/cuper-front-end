import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../../models';

@Component({
  selector: 'cuper-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent {
  @Input() company: Company = {};
  @Output() propagateFormCompany = new EventEmitter<any>();

  constructor() {}

  onSubmit = () => this.propagateFormCompany.emit(this.company);
}
