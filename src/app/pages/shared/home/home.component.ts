import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
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
}
