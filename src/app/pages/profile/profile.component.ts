import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';
import { CardUserComponent } from '../../components/card-user/card-user.component';

@Component({
    selector: 'cuper-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CardUserComponent]
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserData();
  }

}
