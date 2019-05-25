import { Component, Input, OnInit } from '@angular/core';
import { Cashier, UserStatus } from '../../models';

@Component({
  selector: 'cuper-card-cashier',
  templateUrl: './card-cashier.component.html',
  styleUrls: ['./card-cashier.component.scss']
})
export class CardCashierComponent implements OnInit {
  @Input() cashiers: Cashier [];

  constructor() { }

  ngOnInit() {
    this.cashiers = [
      {
        name: 'Darwin G',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsTHWKk3Dw4iLwCPa-CuzWTTqeFXG7M5QaigOGP49l1bdckUo',
        email: 'daosgc@example.com',
        status: UserStatus.APPROVED
      },
      {
        name: 'Lenin C',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XkrGVrnn8AcUfRPLvLkUaUObAuAqekLVL2GW7u572073spm7Zg',
        email: 'leviskp@example.com',
        status: UserStatus.PENDING
      },
      {
        name: 'Fabricio F',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsTHWKk3Dw4iLwCPa-CuzWTTqeFXG7M5QaigOGP49l1bdckUo',
        email: 'fabriflores@example.com',
        status: UserStatus.DISABLED
      }
    ];
  }

  onDisabledCashier(){
    console.log('oonDisabledCashier');
  }

  getStatusLabel(status){
    return `common.status.${status}`;
  }

  getButtonName(status){
    const translations = {
      approved: 'common.actions.disable',
      pending: 'common.actions.approve',
      disabled: 'common.actions.enable'
    };
    return translations[status];
  }

}
