import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cuper-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  client = {
    national_id: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
