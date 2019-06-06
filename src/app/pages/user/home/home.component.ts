import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class UserHomeComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
  }

}
