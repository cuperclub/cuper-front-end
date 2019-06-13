import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Employee } from '../../models';
import { EmployeeService } from 'src/app/services';
import { Observable } from 'rxjs';
import { RequestCashierComponent } from '../request-cashier/request-cashier.component';

@Component({
  selector: 'cuper-card-cashier',
  templateUrl: './card-cashier.component.html',
  styleUrls: ['./card-cashier.component.scss']
})
export class CardCashierComponent implements OnInit {
  myEmployees$: Observable<Employee[]>;

  constructor(
    private dialog: MatDialog,
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

  onAddCashier() {
    const dialogRef = this.dialog.open(RequestCashierComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.beforeClosed().subscribe(currentEmployee => {
      if(currentEmployee){
        //TO DO: Add employee into list
      }
    });
  }

}
