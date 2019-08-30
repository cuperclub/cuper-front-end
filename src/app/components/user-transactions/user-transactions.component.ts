import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../table/table.component';
import { DatetimeCellComponent } from '../table/partials';
import { UserService } from 'src/app/services';

@Component({
  selector: 'cuper-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  transactions: Array<any>;
  columnsTransaction: ColumnDefinition[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.myTransactions().subscribe(transactions => {
      var allTransactions = [...transactions['transaction_inputs'], ...transactions['transaction_outputs']]
      allTransactions.sort(function(a, b) {
          return a.created_at - b.created_at;
      });
      this.transactions = this.formatDataForTable(allTransactions);
    });

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
  }

  formatDataForTable (transactions) {
    return transactions.map((transaction) => {
      return {
        company: transaction.company,
        points: transaction.kind === 'TransactionInput' ? `+ ${transaction.points}` : `- ${transaction.points}`,
        created_at: transaction.created_at
      }
    });
  }

}
