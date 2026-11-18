import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, UtilsService } from '../../services';
import { User } from '../../models';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete, MatOption } from '@angular/material/autocomplete';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

export interface ButtonOption {
  action: Function;
  label: string;
};

@Component({
    selector: 'cuper-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatFormField, MatInput, MatAutocompleteTrigger, FormsModule, ReactiveFormsModule, MatAutocomplete, NgFor, MatOption, AvatarComponent, NgIf, MatButton, AsyncPipe, TranslateModule]
})
export class UserSearchComponent implements OnInit {
  @Input() rightButton: ButtonOption;
  @Input() leftButton: ButtonOption;
  @Output() propagateUserData = new EventEmitter<User>();

  users: Observable<User[]>;
  defaultImageProfile: string = '../../../../assets/images/profile-placeholder.png';
  currentUser: User;

  userSearchControl = new UntypedFormControl();

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
