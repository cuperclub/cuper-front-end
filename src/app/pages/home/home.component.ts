import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User, UserStatus, Notification } from '../../models';
import { UserService, UtilsService, PusherService } from '../../services';
import { MatSnackBar } from '@angular/material';
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
  currentPage = 1;
  initItemsPerPage = 5;
  disabledInfiniteScroll = false;
  showHelper = false;

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
    private message: MatSnackBar,
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getObservableUserData();
    //initial notifications
    const current_user = this.userService.getCurrentUserData();
    const currentCompany = this.userService.getCurrentCompany();
    this.showHelper = currentCompany.status == UserStatus.PENDING;
    this.totalPendingNotifications = current_user.pending_notifications;
    const channelName = `usernotifications.${current_user.id}`;
    const eventNotification = 'new-notification';
    const pusherService = new PusherService(channelName);
    pusherService.channel.bind(eventNotification, data => {
      const message = data.message;
      this.message.open(message, 'Ok', {
        duration: 5000,
        verticalPosition: 'top'
      });
      this.totalPendingNotifications = this.totalPendingNotifications + 1;
      current_user.pending_notifications = current_user.pending_notifications + 1;
      this.userService.userDataEdited = current_user;
    });
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
    this.currentPage = 1;
    this.initItemsPerPage = 5;
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
    this.userService.getNotifications(this.currentPage, this.initItemsPerPage).subscribe((data) => {
      this.notifications = this.buildNotifications(data['notifications']);
      this.loadNotifications = true;
    });
  }

  onScrollNotificationsDown () {
    this.currentPage += 1;
    this.userService.getNotifications(this.currentPage, this.initItemsPerPage).subscribe((data) => {
      const newNotifications = this.buildNotifications(data['notifications']);
      this.notifications = this.notifications.concat(newNotifications);
      this.disabledInfiniteScroll = this.notifications.length === data['meta']['total_count'];
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
