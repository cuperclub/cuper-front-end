import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  login() {
    if (this.user.email === 'user@example.com') {
      this.router.navigate(['/user/home']);
    } else if (this.user.email === 'employer@example.com') {
      this.router.navigate(['/employer/home']);
    } else if (this.user.email === 'company@example.com') {
      this.router.navigate(['/company/home']);
    } else {
      alert('Credentials Error');
    }
  }
}
