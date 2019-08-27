import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

// components
import { FooterComponent } from './footer/footer.component';
import { CardOfficeComponent } from './card-office/card-office.component';
import { CardUserComponent } from './card-user/card-user.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BillingCardComponent } from './billing-card/billing-card.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { PlaceholderCardComponent } from './placeholder-card/placeholder-card.component';
import { RewardSmallCardComponent } from './reward-small-card/reward-small-card.component';
import { TableCardComponent } from './table-card/table-card.component';
import { CardCashierComponent } from './card-cashier/card-cashier.component';
import { PreviewRewardComponent } from './preview-reward/preview-reward.component';
import { CardCounterComponent } from './card-counter/card-counter.component';
import { SquareSelectComponent } from './square-select/square-select.component';
import { RewardCardComponent } from './reward-card/reward-card.component';
import { NewRewardCardComponent } from './new-reward-card/new-reward-card.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { UpdatePasswordFormComponent } from './update-password-form/update-password-form.component';
import { InputTransactionFormComponent } from './input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from './output-transaction-form/output-transaction-form.component';
import { OfficePreviewComponent } from './office-preview/office-preview.component';
import { CardPointsComponent } from './card-points/card-points.component';
import { CardRegisterCompanyComponent } from './card-register-company/card-register-company.component';
import { MapComponent } from './map/map.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { CardPlanComponent } from './card-plan/card-plan.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { RequestCashierComponent } from './request-cashier/request-cashier.component';
import { LoaderComponent } from './loader/loader.component';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { AvatarFileComponent } from './avatar-file/avatar-file.component';
import { TableComponent } from './table/table.component';
import { CellTableComponent } from './table/cell-table/cell-table.component';
import { RewardDialogComponent } from './reward-dialog/reward-dialog.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';

import {
  DatetimeCellComponent,
  UserCellComponent,
  PromotionCellComponent,
  RolesCellComponent,
  ActionsCellComponent,
  TransactionTypeCellComponent
} from './table/partials';

const components = [
  FooterComponent,
  CardOfficeComponent,
  CardUserComponent,
  AvatarComponent,
  BillingCardComponent,
  CompanyCardComponent,
  PlaceholderCardComponent,
  RewardSmallCardComponent,
  TableCardComponent,
  CardCashierComponent,
  PreviewRewardComponent,
  CardCounterComponent,
  RewardCardComponent,
  OfficeFormComponent,
  CompanyFormComponent,
  ProfileFormComponent,
  UpdatePasswordFormComponent,
  InputTransactionFormComponent,
  OutputTransactionFormComponent,
  NewRewardCardComponent,
  SquareSelectComponent,
  OfficePreviewComponent,
  ControlMessagesComponent,
  CardPointsComponent,
  CardRegisterCompanyComponent,
  CardPlanComponent,
  MapComponent,
  UserSearchComponent,
  RequestCashierComponent,
  LoaderComponent,
  CompanyDialogComponent,
  AvatarFileComponent,
  TableComponent,
  CellTableComponent,
  DatetimeCellComponent,
  UserCellComponent,
  PromotionCellComponent,
  RewardDialogComponent,
  CategoryFormComponent,
  RolesCellComponent,
  ActionsCellComponent,
  ChangePasswordDialogComponent,
  FeedbackFormComponent,
  PlanFormComponent,
  SettingsFormComponent,
  UserTransactionsComponent,
  TransactionTypeCellComponent
];

@NgModule({
  declarations: components,
  entryComponents: [
    OfficeFormComponent,
    CompanyDialogComponent,
    ProfileFormComponent,
    UpdatePasswordFormComponent,
    InputTransactionFormComponent,
    OutputTransactionFormComponent,
    OfficePreviewComponent,
    RequestCashierComponent,
    DatetimeCellComponent,
    UserCellComponent,
    PromotionCellComponent,
    RewardDialogComponent,
    CategoryFormComponent,
    RolesCellComponent,
    ActionsCellComponent,
    ChangePasswordDialogComponent,
    FeedbackFormComponent,
    PlanFormComponent,
    SettingsFormComponent,
    UserTransactionsComponent,
    TransactionTypeCellComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: components
})
export class ComponentsModule { }
