import { Routes } from '@angular/router';

import { NewRewardCardComponent } from '../../components/new-reward-card/new-reward-card.component';
import { MyCompanyComponent } from './my-company/my-company.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RewardComponent } from './reward/reward.component';
import { CompanyComponent } from './company/company.component';
import { partnerGuard } from '../../guards/partner/partner.guard';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    component: CompanyComponent,
    canActivate: [partnerGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MyCompanyComponent, canActivate: [partnerGuard] },
      {
        path: 'reward',
        children: [
          { path: 'list', component: RewardsComponent, canActivate: [partnerGuard] },
          { path: 'new', component: NewRewardCardComponent, canActivate: [partnerGuard] },
          { path: 'edit/:rewardId', component: NewRewardCardComponent, canActivate: [partnerGuard] },
          { path: 'details/:rewardId', component: RewardComponent, canActivate: [partnerGuard] }
        ]
      }
    ]
  }
];
