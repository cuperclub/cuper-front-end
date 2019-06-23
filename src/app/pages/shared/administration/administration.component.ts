import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Employee, EmployeeRol } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'cuper-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  currentUser: User;
  employeeRecords: Employee [];
  currentEmployee: Employee;
  updatedView: boolean = false

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
    this.employeeRecords = this.currentUser.companies;
    this.currentEmployee = this.userService.getCurrentCompany();
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

  onChangeEmployeeAccount (company) {
    if (this.currentEmployee.id !== company.id){
      this.currentEmployee = company;
      this.updatedView = true;
      this.userService.setCompanyIdView(company.id);
      setTimeout(() => { this.updatedView = false }, 1000);
    }
  }

  getStatusAccount(status) {
    let iconStatus = '';
    switch (status) {
      case UserStatus.APPROVED:
        iconStatus = 'check_circle_outline';
        break;
      case UserStatus.PENDING:
        iconStatus = 'input';
        break;
      case UserStatus.DISABLED:
        iconStatus = 'domain_disabled';
        break;
    }
    return iconStatus;
  }
}