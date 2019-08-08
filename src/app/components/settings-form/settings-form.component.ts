import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';
import { Setting } from '../../models';
import { CategoryService } from '../../services';

@Component({
  selector: 'cuper-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  settingForm: Setting;

  constructor(
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}


  ngOnInit() {
    this.generateForm();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  private generateForm(): void {
    const defaultOffice: Setting = {
      points_by_register: 0
    };
    this.settingForm = Object.assign(defaultOffice, this.data.category);
  }

  onSubmit(category): void {
    this.categoryService.updateCategories(category).subscribe(
      res =>    this.onSuccess(res, 'common.messages.updated'),
      error =>  this.onError(error)
    );
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
