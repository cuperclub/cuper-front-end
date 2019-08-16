import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Employee, Notification } from '../../models';
import { UserService, UtilsService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentEmployee: Employee;
  updatedView: boolean = false;
  loadNotifications: boolean = false;
  notifications: Array<Notification> = [];
  currentUser$: Observable<User>;

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getObservableUserData();
    this.userService.getCurrentUserData();
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

  getNotifications() {
    const current_user = this.userService.getCurrentUserData();
    if (!this.loadNotifications){
      if (current_user.pending_notifications > 0){
        this.userService.readNotifications().subscribe(()=>{
          this.getMyNotifications();
        })
      }else{
        this.getMyNotifications();
      }
    }
  }

  getMyNotifications () {
    this.userService.getNotifications().subscribe((data) => {
      this.notifications = this.buildNotifications(data);
      this.loadNotifications = true;
    });
  }

  buildNotifications(notifications){
    return notifications.map((notification) => {
      let actions = null;
      if (notification.kind === 'request_employee' && notification.status === 'pending') {
        actions = [
          {
            title: 'Aceptar',
            class: 'primary',
            onClick: () => {
              this.acceptRequestEmployee(notification.id);
            }
          },
          {
            title: 'Declinar',
            class: 'secondary',
            onClick: () => {
              this.declinedRequestEmployee(notification.id);
            }
          },
        ]
      }
      return {
        title: notification.message,
        actions: actions
      }
    })
  }

  acceptRequestEmployee(id) {
    this.userService.answerNotifications(id, {status: 'approved'}).subscribe((notification) => {
      console.log('notification: ', notification);
    });
  }

  declinedRequestEmployee(id) {
    this.userService.answerNotifications(id, {status: 'declined'}).subscribe((notification) => {
      console.log('notification: ', notification);
    });
  }
  getAvatar = this.utilsService.getAvatar;
}
