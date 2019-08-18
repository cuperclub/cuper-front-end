import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models';
import { InputTransactionFormComponent } from '../../../components/input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from '../../../components/output-transaction-form/output-transaction-form.component';
import { ButtonOption } from '../../../components/user-search/user-search.component';
import { InputTransactionService, OutputTransactionService } from '../../../services';
import { ColumnDefinition } from '../../../components/table/table.component';
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

  constructor(
    private inputTransactionService: InputTransactionService,
    private outputTransactionService: OutputTransactionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
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
    this.inputTransactionService.getAll().subscribe(resp => this.inputTransactions = resp['transaction_inputs']);
    this.outputTransactionService.getAll().subscribe(resp => this.outputTransactions = resp['transaction_outputs']);
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
