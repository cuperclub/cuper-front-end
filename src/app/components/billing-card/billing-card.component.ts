import { Component, OnInit, Input } from '@angular/core';

import { Company } from '../../models';

@Component({
  selector: 'cuper-billing-card',
  templateUrl: './billing-card.component.html',
  styleUrls: ['./billing-card.component.scss']
})
export class BillingCardComponent implements OnInit {

  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
