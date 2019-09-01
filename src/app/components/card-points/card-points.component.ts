import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models';
import { UserTransactionsComponent } from '../user-transactions/user-transactions.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cuper-card-points',
  templateUrl: './card-points.component.html',
  styleUrls: ['./card-points.component.scss']
})
export class CardPointsComponent implements OnInit {
  @Input() user: User;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  getTransactions() {
    const dialogRef = this.dialog.open(UserTransactionsComponent, {
      width: '500px',
      data: {}
    });
  }
}
