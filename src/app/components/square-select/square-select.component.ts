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
  @Input() onSelect: Function = () => console.log('selected');

  activeIndex: Number;

  constructor() { }

  ngOnInit() {
    this.options = [
      {
        title: 'Rob Stark',
        description: 'The King of the North'
      },
      {
        title: 'Aria Stark',
        description: 'the king of the North'
      },
      {
        title: 'Jhon Snow',
        description: 'the king of the North'
      },
      {
        title: 'Sansa Stark',
        description: 'the king of the North'
      }
    ];
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
