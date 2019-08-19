import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User } from '../../../models';
import { UserService, UtilsService } from '../../../services';

@Component({
  selector: 'cuper-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  currentUser: User;
  updatedView: boolean = false

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserData();
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
  getAvatar = this.utilsService.getAvatar;
}
