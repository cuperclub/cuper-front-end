import { Component, OnInit } from '@angular/core';
import { AdminSettingService, AdminPlanService } from '../../../services';
import {SettingsFormComponent} from '../../../components/settings-form/settings-form.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cuper-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  setting: any;
  planSelected: any;
  loaded: boolean = false;

  constructor(
    private settingService: AdminSettingService,
    private planService: AdminPlanService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.settingService.getSettings().subscribe(data => {
      this.setting = data || {};
      this.planSelected = this.planService.planForCard(this.setting.plan_selected || {});
      this.loaded = true;
    });
  }

  editSettings() {
    const dialogRef = this.dialog.open(SettingsFormComponent, {
      width: '300px',
      data: {
        setting: Object.assign({}, this.setting)
      }
    });

    dialogRef.beforeClosed().subscribe(setting => {
      if(setting){
        this.setting = setting;
        this.planSelected = this.planService.planForCard(setting.plan_selected);
      }
    });
  }

}
