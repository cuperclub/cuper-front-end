import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee, UserStatus } from '../../models';
import { EmployeeService, UtilsService } from 'src/app/services';
import { RequestCashierComponent } from '../request-cashier/request-cashier.component';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { MatCard } from '@angular/material/card';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatTabGroup, MatTab, MatTabContent } from '@angular/material/tabs';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-card-cashier',
    templateUrl: './card-cashier.component.html',
    styleUrls: ['./card-cashier.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatIconButton, MatIcon, MatDivider, MatTabGroup, MatTab, MatTabContent, NgIf, NgFor, AvatarComponent, NgClass, MatButton, TranslateModule]
})
export class CardCashierComponent implements OnInit {
  myEmployees: Employee[];
  requestsEmployees: any;
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
    private utilsService: UtilsService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.employeeService.getMyEmployees().subscribe((data) => {
      this.myEmployees = data['employees'];
      this.changeDetector.markForCheck();
    });
    this.employeeService.getPendingRequestEmployees().subscribe((data) => {
      this.requestsEmployees = data;
      this.changeDetector.markForCheck();
    });
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

    dialogRef.beforeClosed().subscribe(request => {
      if(request){
        this.requestsEmployees = [request].concat(this.requestsEmployees);
        this.changeDetector.markForCheck();
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
        this.changeDetector.markForCheck();
      }
    });
  }

}
