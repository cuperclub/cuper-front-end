import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UserService, UtilsService } from '../../services';
import { User } from '../../models';

export interface ButtonOption {
  action: Function;
  label: string;
};

@Component({
  selector: 'cuper-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  @Input() rightButton: ButtonOption;
  @Input() leftButton: ButtonOption;
  @Output() propagateUserData = new EventEmitter<User>();

  users: Observable<User[]>;
  defaultImageProfile: string = '../../../../assets/images/profile-placeholder.png';
  currentUser: User;

  userSearchControl = new FormControl();

  constructor(
    private userService: UserService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.userSearchControl.valueChanges
      .subscribe(query => this.users = this.userService.searchUsers(query));
  }

  onClickOption(option){
    this.currentUser = option;
    this.propagateUserData.emit(this.currentUser);
  }

  getAvatar = this.utilsService.getAvatar;
}
