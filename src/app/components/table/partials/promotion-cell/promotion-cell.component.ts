import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'cuper-promotion-cell',
    templateUrl: './promotion-cell.component.html',
    styleUrls: ['./promotion-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgIf]
})
export class PromotionCellComponent implements OnInit {
  @Input() data: { promotion?: { title?: string; terms?: string } };

  constructor() { }

  ngOnInit() {
  }

}
