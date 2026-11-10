import { Routes } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { CashierGuard } from '../../guards/cashier/cashier.guard';

export const EMPLOYEE_ROUTES: Routes = [
  { path: '', component: TransactionsComponent, canActivate: [CashierGuard] }
];
