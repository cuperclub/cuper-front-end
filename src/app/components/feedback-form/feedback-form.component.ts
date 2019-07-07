import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';
import { AdminCompanyService } from '../../services';

@Component({
  selector: 'cuper-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: any;

  constructor(
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    private companyService: AdminCompanyService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    const defaultFeedback = {
      status: '',
      feedback: '',
      company: {}
    };
    this.feedbackForm = Object.assign(defaultFeedback, this.data);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(feedbackForm): void {
    this.companyService.changeStatusCompany(
      feedbackForm.company,
      feedbackForm.status,
      feedbackForm.feedback
    ).subscribe(
      res =>    this.onSuccess(res),
      error =>  this.onError(error)
    );
  }

  onSuccess(resp): void {
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    let errors = resp.error ? resp.error.errors : {};
    this.message.open(errors, '', {
      duration: 2000
    });
    this.dialogRef.close();
  }
}
