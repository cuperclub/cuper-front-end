import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models';
import { InputTransactionFormComponent } from '../../../components/input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from '../../../components/output-transaction-form/output-transaction-form.component';
import { ButtonOption } from '../../../components/user-search/user-search.component';
import { InputTransactionService } from '../../../services';
import { ColumnDefinition } from '../../../components/table/table.component';
import { DatetimeCellComponent } from '../../../components/table/partials';

@Component({
  selector: 'cuper-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  currentUser: User;
  rightButton: ButtonOption;
  leftButton: ButtonOption;

  columns: ColumnDefinition[];
  exampleData: object [];

  constructor(
    private transactionService: InputTransactionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    //mockdata
    this.columns = [
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

    this.rightButton = {
      action: this.onInputTransaction,
      label: 'transactions.input_transaction'
    };
    this.leftButton = {
      action: this.onOutputTransaction,
      label: 'transactions.output_transaction'
    };
    this.transactionService.getAll().subscribe(resp => this.exampleData = resp['transaction_inputs']);
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
      console.log('resp', resp);
    });
  }

  onOutputTransaction = () => {
    this.dialog.open(OutputTransactionFormComponent, {
      width: '400px',
      data: {
        user: this.currentUser,
        rewards : [
          {
            title: 'First Promotion',
            description: '2x1 in hotdogs'
          },
          {
            title: 'Second Promotion',
            description: '2x1 in hotdogs'
          },
          {
            title: 'Third Promotion',
            description: '2x1 in hotdogs'
          }
        ],
        onSelectReward: (reward) => console.log('reward selected', reward),
        onSubmitReward: () => console.log('onSubmitReward')
      }
    });
  }

}
