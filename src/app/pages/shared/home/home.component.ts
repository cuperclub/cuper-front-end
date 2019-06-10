import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Employee, EmployeeRol } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  employeeRecords: Employee [];
  currentEmployee: Employee;

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
    this.employeeRecords = [
      {
        user : this.currentUser,
        company: {
          business_name: 'Mr. Krabs'
        },
        status: UserStatus.APPROVED,
        role: EmployeeRol.PARTNER,
      },
      {
        user : this.currentUser,
        company: {
          business_name: 'PupilaBox'
        },
        status: UserStatus.DISABLED,
        role: EmployeeRol.CASHIER,
      },
      {
        user : this.currentUser,
        company: {
          business_name: 'Rumberitos'
        },
        status: UserStatus.PENDING,
        role: EmployeeRol.CASHIER,
      }
    ];
    this.currentEmployee = this.employeeRecords[0];
  }

  logOut() {
    this.tokenService.signOut().subscribe(resp =>{
      if(resp.success){
        this.userService.clearDataOnLocalStorage();
        this.router.navigateByUrl('');
      }
    });
  }

  goToMyProfile() {
    this.router.navigate(['home/profile']);
  }

  onRegisterCompany = () => this.router.navigate(['home/company/register']);

  onChangeEmployeeAccount = (employee) => this.currentEmployee = employee;

  getStatusAccount(status) {
    let iconStatus = '';
    switch (status) {
      case UserStatus.APPROVED:
        iconStatus = 'check_circle_outline';
        break;
      case UserStatus.PENDING:
        iconStatus = 'input';
        break;
      case UserStatus.DELETED:
        iconStatus = 'remove_circle_outline';
        break;
      case UserStatus.DISABLED:
        iconStatus = 'domain_disabled';
        break;
    }
    return iconStatus;
  }
}
