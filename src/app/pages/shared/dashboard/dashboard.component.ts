import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'cuper-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
  }

  onListerMapPosition(coordinates){
    console.log('current position', coordinates);
  }

}
