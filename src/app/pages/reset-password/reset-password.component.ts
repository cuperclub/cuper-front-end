import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ControlMessagesComponent } from '../../components/control-messages/control-messages.component';
import { MatButton } from '@angular/material/button';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatIcon, MatError, ControlMessagesComponent, MatButton, RouterLink, FooterComponent, TranslateModule]
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: UntypedFormGroup;
  showPassword: any = {password: false, password_confirmation: false};
  queryParams: any;

  constructor(
    private fb: UntypedFormBuilder,
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
