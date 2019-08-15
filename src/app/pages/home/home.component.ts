import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Employee } from '../../models';
import { UserService, UtilsService } from '../../services';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  employeeRecords: Employee [];
  currentEmployee: Employee;
  updatedView: boolean = false;
  notifications: any = [];

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
    this.employeeRecords = this.currentUser.companies;
    this.currentEmployee = this.userService.getCurrentCompany();
    this.notifications = this.buildNotifications(this.getPendingRequest());
    console.log('this.notifications: ', this.notifications);
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
      this.userService.updateCompanyIdView(company.id).subscribe(resp =>{
        this.currentEmployee = company;
        this.updatedView = true;
        this.userService.setCompanyIdView(resp['company_id']);
        setTimeout(() => { this.updatedView = false }, 1000);
      });
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


  getPendingRequest(){
    return this.currentUser.companies.filter((company)=>{
      return company.status === 'pending' && company.role === 'cashier'
    })
  }

  buildNotifications(items){
    return items.map((item)=>{
      return {
        title: `La empresa: ${item.name} quiere registrarte como empleado`,
        actions: [
          {
            title: 'Aceptar',
            class: 'primary',
            onClick: () => {
              console.log('aceptar');
            }
          },
          {
            title: 'Declinar',
            class: 'secondary',
            onClick: () => {
              console.log('declinar');
            }
          },
        ]
      }
    })
  }

  getAvatar = this.utilsService.getAvatar;
}
