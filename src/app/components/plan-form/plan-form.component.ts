import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';
import { Plan } from '../../models';
import { AdminPlanService } from '../../services';

@Component({
  selector: 'cuper-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {
  planForm: Plan;

  constructor(
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    private planService: AdminPlanService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.generateForm();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  private generateForm(): void {
    const defaultPlan: Plan = {
      name: '',
      price: 1,
      information: '',
      active: false,
      days: 1
    };
    this.planForm = Object.assign(defaultPlan, this.data.plan);
  }

  onSubmit(plan): void {
    if (!!this.data.new){
      this.planService.addPlan(plan).subscribe(
        res =>    this.onSuccess(res, 'common.messages.created'),
        error =>  this.onError(error)
      );
    }else{
      this.planService.updatePlan(plan).subscribe(
        res =>    this.onSuccess(res, 'common.messages.updated'),
        error =>  this.onError(error)
      );
    }
  }

  onSuccess(resp, key): void {
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    let errors = resp.error ? resp.error.errors : {};
  }

}
