import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'cuper-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.getDataOnLocalStorage();
  }

}
