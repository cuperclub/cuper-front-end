import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { User } from '../../../models';

@Component({
  selector: 'app-company-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class CompanyHomeComponent implements OnInit {
  currentUser: User;

  constructor(private tokenService: AngularTokenService) { }

  ngOnInit() {
    this.currentUser = this.tokenService.currentUserData;
  }

}
