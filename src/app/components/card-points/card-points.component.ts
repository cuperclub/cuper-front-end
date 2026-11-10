import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models';
import { UserTransactionsComponent } from '../user-transactions/user-transactions.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-card-points',
    templateUrl: './card-points.component.html',
    styleUrls: ['./card-points.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatButton, TranslateModule]
})
export class CardPointsComponent implements OnInit {
  @Input() user: User;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  getTransactions() {
    this.dialog.open(UserTransactionsComponent, {
      width: '500px',
      data: {}
    });
  }
}
