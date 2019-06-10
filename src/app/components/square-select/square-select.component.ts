import { Component, OnInit, Input } from '@angular/core';

interface OptionSquare {
  description: string
  title: string
}

@Component({
  selector: 'cuper-square-select',
  templateUrl: './square-select.component.html',
  styleUrls: ['./square-select.component.scss']
})
export class SquareSelectComponent implements OnInit {
  @Input() options: OptionSquare [];
  @Input() onSelect: Function;
  @Input() className: string = '';
  @Input() seletedOption: OptionSquare;

  activeIndex: Number;

  constructor() { }

  ngOnInit() {
    if(this.seletedOption) {
      this.activeIndex = this.options.indexOf(this.seletedOption);
    }
  }

  onClick (index) {
    if (this.activeIndex == index){
      this.activeIndex = null;
      this.onSelect(null);
    }else{
      this.activeIndex = index;
      this.onSelect(this.options[index]);
    }
  }
}
