import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface OptionPlan {
  price: number
  time: string
  promotion?: string
}

@Component({
  selector: 'cuper-card-plan',
  templateUrl: './card-plan.component.html',
  styleUrls: ['./card-plan.component.scss']
})
export class CardPlanComponent {
  @Input() option: OptionPlan;
  @Input() isSelected: boolean = false;
  @Output() propagatePlanData = new EventEmitter<any>();

  constructor() { }

  onClickCard = (plan) => this.propagatePlanData.emit(plan);
}