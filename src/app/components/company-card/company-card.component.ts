import { Component, OnInit, Input } from '@angular/core';

import { Company } from '../../models';

@Component({
  selector: 'cuper-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company: Company;
  @Input() editCompany: Function = () => console.log('editting');

  constructor() { }

  ngOnInit() {
  }

}
