import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { CashierGuard } from '../../guards/cashier/cashier.guard';

//Pages
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: '', component: TransactionsComponent, canActivate: [CashierGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
