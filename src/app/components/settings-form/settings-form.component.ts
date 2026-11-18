import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Setting } from '../../models';
import { AdminSettingService } from '../../services';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'cuper-settings-form',
    templateUrl: './settings-form.component.html',
    styleUrls: ['./settings-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, MatFormField, MatInput, MatLabel, MatSelect, NgFor, MatOption, MatButton, TranslateModule]
})
export class SettingsFormComponent implements OnInit {
  settingForm: Setting;

  constructor(
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    private settingService: AdminSettingService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}


  ngOnInit() {
    this.generateForm();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  private generateForm(): void {
    const defaultSetting: Setting = {
      points_by_register: 0
    };
    this.settingForm = Object.assign(defaultSetting, this.data.setting);
  }

  onSubmit(setting): void {
    this.settingService.updateSetting(setting).subscribe(
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
    this.message.open(errors, '', {
      duration: 2000
    });
  }
}
