import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models';
import { InputTransactionFormComponent } from '../../../components/input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from '../../../components/output-transaction-form/output-transaction-form.component';
import { ButtonOption } from '../../../components/user-search/user-search.component';
import { InputTransactionService } from '../../../services';
import { ColumnDefinition } from '../../../components/table/table.component';

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
        label: 'position',
        displayName: 'Nº'
      },
      {
        label: 'name',
        displayName: 'Name'
      },
      {
        label: 'weight',
        displayName: 'Weight'
      },
      {
        label: 'symbol',
        displayName: 'Simbol'
      }
    ];
    this.exampleData = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];

    this.rightButton = {
      action: this.onInputTransaction,
      label: 'transactions.input_transaction'
    };
    this.leftButton = {
      action: this.onOutputTransaction,
      label: 'transactions.output_transaction'
    };
    // this.transactionService.getAll().subscribe(resp => console.log(resp));
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
