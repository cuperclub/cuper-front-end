import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Company, Promotion, Office } from '../../models';
import { MatCard } from '@angular/material/card';
import { PreviewRewardComponent } from '../preview-reward/preview-reward.component';
import { CardCounterComponent } from '../card-counter/card-counter.component';
import { NgIf, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-reward-card',
    templateUrl: './reward-card.component.html',
    styleUrls: ['./reward-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, PreviewRewardComponent, CardCounterComponent, NgIf, MatButton, DatePipe, TranslateModule]
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
