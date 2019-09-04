import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Employee, UserStatus } from '../../models';
import { EmployeeService, UtilsService } from 'src/app/services';
import { RequestCashierComponent } from '../request-cashier/request-cashier.component';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';

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
    declined: {
      action: UserStatus.APPROVED,
      translation: 'common.actions.enable'
    }
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

  onDisabledCashier(cashier: Employee){
    const dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '300px',
      data: {
        status: this.mappingStatus[cashier.status].action,
        feedback: '',
        from: 'cashier',
        id: cashier.id
      }
    });

    dialogRef.beforeClosed().subscribe(cashier => {
      if(cashier){
        const indexEmployee = this.myEmployees.findIndex(employee => employee.id === cashier.id);
        this.myEmployees[indexEmployee] = cashier;
      }
    });
  }

}
