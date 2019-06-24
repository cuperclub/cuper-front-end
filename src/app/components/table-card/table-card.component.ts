import { Component, OnInit, Input } from '@angular/core';

interface OptionRow {
  title: string;
  description: string;
  image: string;
  number: number;
  text: string;
}

@Component({
  selector: 'cuper-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent implements OnInit {
  @Input() items: OptionRow[];
  @Input() onClick: Function;
  @Input() indexActive: number = -1;

  constructor() {
    this.items = this.items;
  }

  ngOnInit() {
  }

}
