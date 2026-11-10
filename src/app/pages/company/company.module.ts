import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Pages
import { MyCompanyComponent } from './my-company/my-company.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RewardComponent } from './reward/reward.component';
import { CompanyComponent } from './company/company.component';

@NgModule({
    imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule.forChild(),
    MyCompanyComponent,
    RewardsComponent,
    RewardComponent,
    CompanyComponent
],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())]
})
export class CompanyModule { }
