import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'cuper-placeholder-card',
  templateUrl: './placeholder-card.component.html',
  styleUrls: ['./placeholder-card.component.scss']
})
export class PlaceholderCardComponent implements OnInit {
  @Input() icon: string = 'add';
  @Input() text: string;
  @Input() onClick: Function = () => console.log('no Function');

  constructor() { }

  ngOnInit() {
  }

}
