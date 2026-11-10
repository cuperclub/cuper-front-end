import { Routes } from '@angular/router';

import { PromotionsComponent } from './promotions/promotions.component';
import { AuthGuard } from '../../guards/auth/auth.guard';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: PromotionsComponent, canActivate: [AuthGuard] }
];
