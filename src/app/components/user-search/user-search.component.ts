import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../../services';
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

  stateCtrl = new FormControl();
  filteredUsers: Observable<User[]>;
  defaultImageProfile: string = '../../../../assets/images/profile-placeholder.png';
  currentUser: User;
  users: User[];

  constructor(
    private userService: UserService
  ) {
    this.filteredUsers = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterUsers(state) : this.users.slice())
      );
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    if(this.currentUser) this.currentUser = undefined;
    return this.users.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.users = this.userService.getMockData();
  }

  onClickOption(option){
    this.currentUser = option;
    this.propagateUserData.emit(this.currentUser);
  }

}
