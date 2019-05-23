import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-placeholder',
  templateUrl: './card-placeholder.component.html',
  styleUrls: ['./card-placeholder.component.scss']
})
export class CardPlaceholderComponent implements OnInit {

  @Input() icon: string = 'add';
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
