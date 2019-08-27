import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cuper-transaction-type-cell',
  templateUrl: './transaction-type-cell.component.html',
  styleUrls: ['./transaction-type-cell.component.scss']
})
export class TransactionTypeCellComponent implements OnInit {
  @Input() data: Object;

  constructor() { }

  ngOnInit() {
  }

}
