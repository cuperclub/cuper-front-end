import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'cuper-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  plan: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserData();
  }

  onListerCompanyData(company){
    this.plan = company.plan;
  }
}
