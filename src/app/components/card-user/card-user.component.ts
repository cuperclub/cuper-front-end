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

  ngOnInit() {
    this.user = {
      name: 'Partner',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsTHWKk3Dw4iLwCPa-CuzWTTqeFXG7M5QaigOGP49l1bdckUo',
      email: 'partner@example.com',
      national_id: '123456789'
    };
  }

  onUpdateInformation() {
    console.log('launch modal to update information');
  }

  onUpdatePassword() {
    console.log('launch modal to change password');
  }

}
