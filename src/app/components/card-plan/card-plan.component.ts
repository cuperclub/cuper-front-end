import { Component, OnInit, Input } from '@angular/core';

interface OptionPlan {
  price: number
  time: string
  promotion?: string
}

@Component({
  selector: 'cuper-card-plan',
  templateUrl: './card-plan.component.html',
  styleUrls: ['./card-plan.component.scss']
})
export class CardPlanComponent implements OnInit {
  @Input() option: OptionPlan;
  @Input() onSelect: Function;

  activeIndex: Number;

  constructor() { }

  ngOnInit() {
    // if(this.seletedOption) {
    //   this.activeIndex = this.options.indexOf(this.seletedOption);
    // }
  }

  onClick (index) {
    this.onSelect(this.option);
  }
}
