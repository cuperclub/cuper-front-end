import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models';
import { UserService, UtilsService, AuthService } from '../../../services';

@Component({
    selector: 'cuper-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
