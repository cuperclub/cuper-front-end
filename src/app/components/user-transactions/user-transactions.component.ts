import { Component, OnInit, Inject } from '@angular/core';
import { ColumnDefinition } from '../table/table.component';
import { DatetimeCellComponent } from '../table/partials';
import { UserService } from 'src/app/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cuper-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  transactions: Array<any>;
  columnsTransaction: ColumnDefinition[];
  loaded: boolean = false;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.userService.myTransactions().subscribe(transactions => {
      var allTransactions = [...transactions['transaction_inputs'], ...transactions['transaction_outputs']]
      allTransactions.sort(function(a, b) {
        return b.created_at - a.created_at;
      });
      this.transactions = this.formatDataForTable(allTransactions);
      this.loaded = true;
    });

    this.columnsTransaction = [
      {
        label: 'company',
        displayName: 'Compania',
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
        created_at: transaction.created_at,
        class: transaction.kind === 'TransactionInput' ? 'input' : 'output'
      }
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
