import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../table/table.component';
import { UserCellComponent, DatetimeCellComponent, TransactionTypeCellComponent } from '../table/partials';

@Component({
  selector: 'cuper-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  transactions: Array<any>;
  columnsTransaction: ColumnDefinition[];

  constructor() { }

  ngOnInit() {
    this.columnsTransaction = [
      {
        label: 'company',
        displayName: 'Company',
      },
      {
        label: 'points',
        displayName: 'Puntos'
      },
      {
        label: 'created_at',
        displayName: 'Fecha',
        component: DatetimeCellComponent
      }

    ];

    this.transactions = [
      { company: 'Company 1', user: { name: 'Lenin Capa.', email: 'lenin@example.com' }, points: '+ 10', created_at: "1566938014703", kind: 'input' },
      { company: 'Company 2', user: { name: 'Lenin Capa 1.', email: 'lenin@example.com' }, points: '- 140', created_at: "1566938014703", kind: 'output' },
      { company: 'Company 3', user: { name: 'Lenin Capa 3.', email: 'lenin@example.com' }, points: '+ 20', created_at: "1566938014703", kind: 'input' },
      { company: 'Company 4', user: { name: 'Lenin Capa 3.', email: 'lenin@example.com' }, points: '+ 2000', created_at: "1566938014703", kind: 'input' },
    ]
  }

}
