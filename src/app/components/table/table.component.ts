import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { CellTableComponent } from './cell-table/cell-table.component';
import { MatPaginator } from '@angular/material/paginator';

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
    imports: [MatTable, NgFor, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgIf, CellTableComponent, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, MatPaginator]
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
