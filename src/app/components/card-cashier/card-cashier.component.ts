import { Component, Input, OnInit } from '@angular/core';
import { Employee, UserStatus } from '../../models';
import { EmployeeService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-card-cashier',
  templateUrl: './card-cashier.component.html',
  styleUrls: ['./card-cashier.component.scss']
})
export class CardCashierComponent implements OnInit {
  myEmployees$: Observable<Employee[]>;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.myEmployees$ = this.employeeService.getMyEmployees();
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
