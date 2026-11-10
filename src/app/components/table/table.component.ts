import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

export interface ColumnDefinition {
  label: string;
  displayName: string;
  component?: any;
};

export interface PaginationDefinition {
  length: number,
  pageSize: number,
  pageSizeOptions: number[],
  pageEvent: Function
}

@Component({
    selector: 'cuper-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TableComponent implements OnInit {
  @Input() columnsDef: ColumnDefinition[];
  @Input() data: Array<Object>;
  @Input() pagniationOptions: PaginationDefinition;
  columnsDefinition: string[];

  constructor() { }

  ngOnInit() {
    this.columnsDefinition = this.columnsDef.map(columnDef => columnDef.label);
  }

}
