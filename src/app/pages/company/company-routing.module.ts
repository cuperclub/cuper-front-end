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
import { IsPartnerGuard } from '../../guards/partner/is-partner.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: 'home',
        component: MyCompanyComponent,
        canActivate: [IsPartnerGuard],
      },
      {
        path: 'register',
        component: CompanyRegisterComponent
      },
      {
        path: 'reward',
        children: [
          {
            path: 'list',
            component: RewardsComponent,
            canActivate: [IsPartnerGuard]
          },
          {
            path: 'new',
            component: NewRewardCardComponent,
            canActivate: [IsPartnerGuard]
          },
          {
            path: 'edit/:rewardId',
            component: NewRewardCardComponent,
            canActivate: [IsPartnerGuard]
          },
          {
            path: 'details/:rewardId',
            component: RewardComponent,
            canActivate: [IsPartnerGuard]
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
