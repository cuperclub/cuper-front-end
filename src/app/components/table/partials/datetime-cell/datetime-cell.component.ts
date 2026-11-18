import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'cuper-datetime-cell',
    templateUrl: './datetime-cell.component.html',
    styleUrls: ['./datetime-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DatePipe]
})
export class DatetimeCellComponent implements OnInit {
  @Input() data: { created_at?: string | Date };

  constructor() { }

  ngOnInit() {
  }

}
