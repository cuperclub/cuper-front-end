import { Component, Input } from '@angular/core';

@Component({
  selector: 'cuper-card-company-plan',
  templateUrl: './card-company-plan.component.html',
  styleUrls: ['./card-company-plan.component.scss']
})
export class CardCompanyPlanComponent {

  @Input() plan;

  constructor() { }

}
