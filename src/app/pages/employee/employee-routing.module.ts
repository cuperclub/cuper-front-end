import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { IsCashierGuard } from '../../guards/cashier/is-cashier.guard';

//Pages
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: '', component: TransactionsComponent, canActivate: [IsCashierGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
