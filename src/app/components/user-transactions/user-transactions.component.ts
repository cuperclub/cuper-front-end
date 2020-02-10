import { Component, OnInit, Inject } from '@angular/core';
import { ColumnDefinition, PaginationDefinition } from '../table/table.component';
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
  paginationOptions: PaginationDefinition;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    const initPage = 1;
    const initItemsPerPage = 5;
    this.userService.myTransactions(initPage, initItemsPerPage).subscribe(resp => {
      this.transactions = this.formatDataForTable(resp['transactions']);
      this.loaded = true;
      this.paginationOptions = {
        length: resp['meta'].total_count,
        pageSize: initItemsPerPage,
        pageSizeOptions: [5, 10, 25, 100],
        pageEvent: pageEvent
      };
    });
    const pageEvent = (paginationData) => {
      const currentPage = paginationData.pageIndex + 1;
      const items_per_page = paginationData.pageSize;
      this.userService.myTransactions(currentPage, items_per_page).subscribe(resp => {
        this.transactions = this.formatDataForTable(resp['transactions']);
      });
    };

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
