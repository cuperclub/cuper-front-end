import { Component, OnInit, Input, Type } from '@angular/core';

export interface ColumnDefinition {
  label: string;
  displayName: string;
  component?: any;
};

@Component({
  selector: 'cuper-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columnsDef: ColumnDefinition[];
  @Input() data: Array<Object>;
  columnsDefinition: string[];

  constructor() { }

  ngOnInit() {
    this.columnsDefinition = this.columnsDef.map(columnDef => columnDef.label);
  }

}
