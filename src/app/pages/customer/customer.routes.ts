import { Routes } from '@angular/router';

import { PromotionsComponent } from './promotions/promotions.component';
import { authGuard } from '../../guards/auth/auth.guard';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: PromotionsComponent, canActivate: [authGuard] }
];
