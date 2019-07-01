import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cuper-datetime-cell',
  templateUrl: './datetime-cell.component.html',
  styleUrls: ['./datetime-cell.component.scss']
})
export class DatetimeCellComponent implements OnInit {
  @Input() data: Object;

  constructor() { }

  ngOnInit() {
  }

}
