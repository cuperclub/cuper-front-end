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

  activeIndex: Number;

  constructor() { }

  ngOnInit() { }

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
