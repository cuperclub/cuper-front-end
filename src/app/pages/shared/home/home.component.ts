import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { User } from '../../../models';

@Component({
  selector: 'cuper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private tokenService: AngularTokenService, private router: Router,) {}

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      res =>  this.setAuth(res),
      error =>  console.log(error)
    );
  }

  setAuth(res) {
    this.currentUser = res.data;
  }

  logOut() {
    this.tokenService.signOut().subscribe(resp =>{
      if(resp.success){
        this.router.navigateByUrl('');
      }
    });
  }

}
