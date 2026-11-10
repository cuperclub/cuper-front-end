import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models';
import { InputTransactionFormComponent } from '../../../components/input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from '../../../components/output-transaction-form/output-transaction-form.component';
import { ButtonOption } from '../../../components/user-search/user-search.component';
import { InputTransactionService, OutputTransactionService } from '../../../services';
import { ColumnDefinition, PaginationDefinition } from '../../../components/table/table.component';
import { DatetimeCellComponent, UserCellComponent, PromotionCellComponent } from '../../../components/table/partials';

@Component({
  selector: 'cuper-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  currentUser: User;
  rightButton: ButtonOption;
  leftButton: ButtonOption;

  columnsInputTransaction: ColumnDefinition[];
  columnsOutputTransaction: ColumnDefinition[];
  inputTransactions: object [];
  outputTransactions: object [];
  pagniationOptionsInputTransactions: PaginationDefinition;
  pagniationOptionsOutputTransactions: PaginationDefinition;

  constructor(
    private inputTransactionService: InputTransactionService,
    private outputTransactionService: OutputTransactionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    const initPageInputTransaction = 1;
    const initItemsPerPageInputTransaction = 5;
    this.columnsInputTransaction = [
      {
        label: 'user',
        displayName: 'Cliente',
        component: UserCellComponent
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

    const initPageOutputTransaction = 1;
    const initItemsPerPageOutputTransaction = 5;
    this.columnsOutputTransaction = [
      {
        label: 'promotion',
        displayName: 'Promoción',
        component: PromotionCellComponent
      },
      {
        label: 'user',
        displayName: 'Cliente',
        component: UserCellComponent
      },
      {
        label: 'created_at',
        displayName: 'Fecha',
        component: DatetimeCellComponent
      }
    ];

    this.rightButton = {
      action: this.onInputTransaction,
      label: 'transactions.input_transaction'
    };
    this.leftButton = {
      action: this.onOutputTransaction,
      label: 'transactions.output_transaction'
    };

    this.inputTransactionService.getAll(initPageInputTransaction, initItemsPerPageInputTransaction).subscribe(resp => {
      this.inputTransactions = resp['transaction_inputs'];
      this.pagniationOptionsInputTransactions = {
        length: resp['meta'].total_count,
        pageSize: initItemsPerPageInputTransaction,
        pageSizeOptions: [5, 10, 25, 100],
        pageEvent: pageEventInputTransactions
      };
    });
    const pageEventInputTransactions = (paginationData) => {
      const currentPage = paginationData.pageIndex + 1;
      const items_per_page = paginationData.pageSize;
      this.inputTransactionService.getAll(currentPage, items_per_page).subscribe(resp => {
        this.inputTransactions = resp['transaction_inputs'];
      });
    };

    this.outputTransactionService.getAll(initPageOutputTransaction, initItemsPerPageOutputTransaction).subscribe(resp => {
      this.outputTransactions = resp['transaction_outputs'];
      this.pagniationOptionsOutputTransactions = {
        length: resp['meta'].total_count,
        pageSize: initItemsPerPageOutputTransaction,
        pageSizeOptions: [5, 10, 25, 100],
        pageEvent: pageEventOutputTransactions
      };
    });
    const pageEventOutputTransactions = (paginationData) => {
      const currentPage = paginationData.pageIndex + 1;
      const items_per_page = paginationData.pageSize;
      this.outputTransactionService.getAll(currentPage, items_per_page).subscribe(resp => {
        this.outputTransactions = resp['transaction_outputs'];
      });
    };
  }

  onListerCustomerSearch(user){
    this.currentUser = user;
  }

  onInputTransaction = () => {
    const dialogRef = this.dialog.open(InputTransactionFormComponent, {
      width: '250px',
      data: {
        user: this.currentUser,
        invoice: {}
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp) {
        this.inputTransactions = [...[resp], ...this.inputTransactions];
      }
    });
  }

  onOutputTransaction = () => {
    const dialogRef = this.dialog.open(OutputTransactionFormComponent, {
      width: '400px',
      data: {
        user: this.currentUser
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp) {
        this.outputTransactions = [...[resp], ...this.outputTransactions];
      }
    });
  }

}
