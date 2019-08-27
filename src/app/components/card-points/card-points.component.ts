import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'cuper-card-points',
  templateUrl: './card-points.component.html',
  styleUrls: ['./card-points.component.scss']
})
export class CardPointsComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  getTransactions() {
    console.log('My Transactions');
  }

}
