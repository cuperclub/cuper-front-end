import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Employee, UserStatus } from '../../models';
import { EmployeeService, UtilsService } from 'src/app/services';
import { RequestCashierComponent } from '../request-cashier/request-cashier.component';

@Component({
  selector: 'cuper-card-cashier',
  templateUrl: './card-cashier.component.html',
  styleUrls: ['./card-cashier.component.scss']
})
export class CardCashierComponent implements OnInit {
  myEmployees: Employee[];
  mappingStatus = {
    approved: {
      action: UserStatus.DISABLED,
      translation: 'common.actions.disable'
    },
    pending: {
      action: UserStatus.APPROVED,
      translation: 'common.actions.approve'
    },
    disabled: {
      action: UserStatus.APPROVED,
      translation: 'common.actions.enable'
    },
  };

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.employeeService.getMyEmployees().subscribe((data) => this.myEmployees = data['employees']);
  }

  getAvatar = this.utilsService.getAvatar;

  onDisabledCashier(cashier: Employee) {
    const statusData = {
      status: this.mappingStatus[cashier.status].action,
      feedback: ''
    };
    this.employeeService.updateStatusEmployee(cashier.id, statusData).subscribe(currentEmployee => {
      const indexEmployee = this.myEmployees.findIndex(employee => employee.id === currentEmployee.id);
      this.myEmployees[indexEmployee] = currentEmployee;
    });
  }

  getStatusLabel(status){
    return `common.status.${status}`;
  }

  getButtonName(status) {
    const translation = this.mappingStatus[status].translation;
    return translation;
  }

  onAddCashier() {
    const dialogRef = this.dialog.open(RequestCashierComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.beforeClosed().subscribe(newEmployee => {
      if(newEmployee){
        this.myEmployees.push(newEmployee)
      }
    });
  }

}
