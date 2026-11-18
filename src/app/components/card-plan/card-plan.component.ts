import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

export interface OptionPlan {
  active?: boolean;
  name?: string;
  price: number
  time: string
  promotion?: string
  id: number
}

@Component({
    selector: 'cuper-card-plan',
    templateUrl: './card-plan.component.html',
    styleUrls: ['./card-plan.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, NgIf, MatIcon]
})
export class CardPlanComponent {
  @Input() option: OptionPlan;
  @Input() isSelected: boolean = false;
  @Output() propagatePlanData = new EventEmitter<any>();

  constructor() { }

  onClickCard = (plan) => this.propagatePlanData.emit(plan);
}
