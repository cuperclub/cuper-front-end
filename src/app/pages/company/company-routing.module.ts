import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { NewRewardCardComponent } from '../../components/new-reward-card/new-reward-card.component';

//Pages
import { MyCompanyComponent } from './my-company/my-company.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RewardComponent } from './reward/reward.component';
import { CompanyComponent } from './company/company.component';

//Guards
import { PartnerGuard } from '../../guards/partner/partner.guard';
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    canActivate: [PartnerGuard],
    children: [
      {
        path: 'home',
        component: MyCompanyComponent,
        canActivate: [PartnerGuard],
      },
      {
        path: 'register',
        component: CompanyRegisterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reward',
        children: [
          {
            path: 'list',
            component: RewardsComponent,
            canActivate: [PartnerGuard]
          },
          {
            path: 'new',
            component: NewRewardCardComponent,
            canActivate: [PartnerGuard]
          },
          {
            path: 'edit/:rewardId',
            component: NewRewardCardComponent,
            canActivate: [PartnerGuard]
          },
          {
            path: 'details/:rewardId',
            component: RewardComponent,
            canActivate: [PartnerGuard]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
