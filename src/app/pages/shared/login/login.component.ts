import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserLogin = {
    email: '',
    password: ''
  };
  hide: true;

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
  }
}
