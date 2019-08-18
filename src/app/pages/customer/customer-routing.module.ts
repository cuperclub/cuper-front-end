import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pages
import { PromotionsComponent } from './promotions/promotions.component';

//Guards
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: PromotionsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
