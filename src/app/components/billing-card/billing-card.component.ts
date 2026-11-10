import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Company } from '../../models';

@Component({
    selector: 'cuper-billing-card',
    templateUrl: './billing-card.component.html',
    styleUrls: ['./billing-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BillingCardComponent implements OnInit {

  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
