import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Company } from '../../models';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-billing-card',
    templateUrl: './billing-card.component.html',
    styleUrls: ['./billing-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatDivider, TranslateModule]
})
export class BillingCardComponent implements OnInit {

  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
