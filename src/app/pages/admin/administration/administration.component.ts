import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../models';
import { UserService, UtilsService, AuthService } from '../../../services';
import { NgIf } from '@angular/common';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { MatIcon } from '@angular/material/icon';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, NgIf, MatMenuTrigger, AvatarComponent, MatIcon, MatMenu, MatMenuItem, RouterLinkActive, RouterOutlet, LoaderComponent, TranslateModule]
})
export class AdministrationComponent implements OnInit {
  currentUser: User;
  updatedView: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserData();
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
  getAvatar = this.utilsService.getAvatar;
}
