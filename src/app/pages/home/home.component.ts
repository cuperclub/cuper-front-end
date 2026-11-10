import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService, UserService, UtilsService, PusherService } from '../../services';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User, UserStatus, Notification } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { NgIf, NgClass, NgFor, AsyncPipe } from '@angular/common';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, NgIf, MatMenuTrigger, NgClass, MatIcon, MatMenu, NgFor, MatMenuItem, AvatarComponent, MatIconButton, MatTooltip, InfiniteScrollDirective, RouterLinkActive, RouterOutlet, LoaderComponent, AsyncPipe, TranslateModule]
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
    private message: MatSnackBar,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.getObservableUserData();
    //initial notifications
    const current_user = this.userService.getCurrentUserData();
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
      this.userService.updateCurrentUserData(current_user);
      this.changeDetector.markForCheck();
    });
  }

  logOut() {
    this.authService.signOut().subscribe(resp =>{
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
        this.userService.updateCurrentUserData(currentUser);
        this.updatedView = true;
        this.changeDetector.markForCheck();
        setTimeout(() => {
          this.updatedView = false;
          this.changeDetector.markForCheck();
        }, 1000);
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
          this.changeDetector.markForCheck();
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
      this.changeDetector.markForCheck();
    });
  }

  onScrollNotificationsDown () {
    this.currentPage += 1;
    this.userService.getNotifications(this.currentPage, this.initItemsPerPage).subscribe((data) => {
      const newNotifications = this.buildNotifications(data['notifications']);
      this.notifications = this.notifications.concat(newNotifications);
      this.disabledInfiniteScroll = this.notifications.length === data['meta']['total_count'];
      this.changeDetector.markForCheck();
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
    this.changeDetector.markForCheck();
  }

  isCompanyAproved() {
    const currentEmployee = this.userService.getCurrentCompany();
    const allowedRol = this.userService.userIsCashier();
    const isCompanyAproverd =  currentEmployee.status === UserStatus.APPROVED;
    return allowedRol && isCompanyAproverd;
  }

  getAvatar = this.utilsService.getAvatar;
}
