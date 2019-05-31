import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models';


@Component({
  selector: 'cuper-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() { }

  onUpdateInformation() {
    console.log('launch modal to update information');
  }

  onUpdatePassword() {
    console.log('launch modal to change password');
  }

}
