import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'cuper-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  showPassword: any = {password: false, password_confirmation: false};
  queryParams: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.userService.resetMyPassword(this.passwordForm.value).subscribe(
      (resp) => {
        this.message.open(resp['message'], '', {
          duration: 2000
        });
        this.router.navigateByUrl('login');
      },
      ({ error }) => {
        delete error.errors['full_messages']
        for (let key in error.errors) {
          this.passwordForm.controls[key].setErrors({'backendError': error.errors[key]});
        }
      }
    );
  }

  toggleShowPassword(field) {
    this.showPassword[field] = !this.showPassword[field];
  }
}
