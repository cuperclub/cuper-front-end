import { Component, OnInit } from '@angular/core';
import { AdminSettingService, AdminPlanService } from '../../../services';

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
  ) { }

  ngOnInit() {
    this.settingService.getSettings().subscribe(data => {
      this.setting = data || {};
      this.planSelected = this.planService.planForCard(this.setting.plan_selected || {});
      this.loaded = true;
    });
  }

  editSettings() {

  }

}
