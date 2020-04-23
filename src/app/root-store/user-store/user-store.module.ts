import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserStoreEffects } from './effects';
import { UserReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', UserReducer),
    EffectsModule.forFeature([UserStoreEffects])
  ]
})
export class UserStoreModule { }
