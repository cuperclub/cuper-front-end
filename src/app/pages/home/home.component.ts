import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Notification } from '../../models';
import { UserService, UtilsService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  updatedView: boolean = false;
  loadNotifications: boolean = false;
  notifications: Array<Notification> = [];
  totalPendingNotifications: number = 0;
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
    //initial notifications
    const current_user = this.userService.getCurrentUserData();
    this.totalPendingNotifications = current_user.pending_notifications;
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

  onRegisterCompany = () => this.router.navigate(['home/register_company']);

  onChangeEmployeeAccount (company) {
    const currentEmployee = this.userService.getCurrentCompany();
    if (currentEmployee.id !== company.id){
      this.userService.updateCompanyIdView(company.id).subscribe(() =>{
        const currentUser = this.userService.getCurrentUserData();
        currentUser.current_company_id = company.id;
        this.userService.observerData.next(currentUser);
        this.userService.userDataEdited = currentUser;
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
        this.userService.readNotifications().subscribe((resp)=>{
          this.totalPendingNotifications = this.totalPendingNotifications > 0 ? this.totalPendingNotifications - resp['total'] : this.totalPendingNotifications;
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
        actions: actions,
        id: notification.id,
        status: notification.status
      }
    })
  }

  acceptRequestEmployee(id) {
    this.userService.answerNotifications(id, {status: 'approved'}).subscribe((resp) => {
      this.updateArrayNotifications(resp);
    });
  }

  declinedRequestEmployee(id) {
    this.userService.answerNotifications(id, {status: 'declined'}).subscribe((resp) => {
      this.updateArrayNotifications(resp);
    });
  }

  findIndexNotification(id){
    return this.notifications.findIndex(notification => notification.id === id );
  }

  updateArrayNotifications(resp){
    let updateNotification = resp['notification'] || {};
    this.notifications[this.findIndexNotification(updateNotification.id)].status = updateNotification.status;
    this.totalPendingNotifications = this.totalPendingNotifications > 0 ? this.totalPendingNotifications - 1 : this.totalPendingNotifications;
  }

  isCompanyAproved() {
    const currentEmployee = this.userService.getCurrentCompany();
    const allowedRol = this.userService.userIsCashier();
    const isCompanyAproverd =  currentEmployee.status === UserStatus.APPROVED;
    return allowedRol && isCompanyAproverd;
  }

  getAvatar = this.utilsService.getAvatar;
}
