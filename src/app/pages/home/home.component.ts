import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Employee } from '../../models';
import { UserService, UtilsService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  employeeRecords: Employee [];
  currentEmployee: Employee;
  updatedView: boolean = false
  currentUser$: Observable<User>;

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getObservableUserData();
    this.currentUser = this.userService.getCurrentUserData();
    this.employeeRecords = this.currentUser.companies;
    this.currentEmployee = this.userService.getCurrentCompany();
  }

  logOut() {
    this.tokenService.signOut().subscribe(resp =>{
      if(resp.success){
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

  getAvatar = this.utilsService.getAvatar;
}
