import { Routes } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { cashierGuard } from '../../guards/cashier/cashier.guard';

export const EMPLOYEE_ROUTES: Routes = [
  { path: '', component: TransactionsComponent, canActivate: [cashierGuard] }
];
