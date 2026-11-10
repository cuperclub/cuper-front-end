import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cuper-promotion-cell',
    templateUrl: './promotion-cell.component.html',
    styleUrls: ['./promotion-cell.component.scss'],
    standalone: false
})
export class PromotionCellComponent implements OnInit {
  @Input() data: { promotion?: { title?: string; terms?: string } };

  constructor() { }

  ngOnInit() {
  }

}
