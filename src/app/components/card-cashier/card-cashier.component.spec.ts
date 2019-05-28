import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app/material.module';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CardCashierComponent } from './card-cashier.component';
import { AvatarComponent } from '../avatar/avatar.component';

describe('CardCashierComponent', () => {
  let component: CardCashierComponent;
  let fixture: ComponentFixture<CardCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forChild(),
      ],
      declarations: [ CardCashierComponent, AvatarComponent, ],
      providers: [ TranslateStore ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
