import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Company, Promotion, Office } from '../../models';

@Component({
    selector: 'cuper-reward-card',
    templateUrl: './reward-card.component.html',
    styleUrls: ['./reward-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RewardCardComponent implements OnInit {

  @Input() company: Company;
  @Input() promotion: Promotion;
  @Input() office: Office;
  @Input() editReward: Function;
  @Input() disableEvents: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
