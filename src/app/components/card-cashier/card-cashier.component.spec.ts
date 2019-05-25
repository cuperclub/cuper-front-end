import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app/material.module';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CardCashierComponent } from './card-cashier.component';
import { ComponentsModule } from '../../components/components.module';

describe('CardCashierComponent', () => {
  let component: CardCashierComponent;
  let fixture: ComponentFixture<CardCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        MaterialModule,
        TranslateModule.forChild(),
      ],
      declarations: [ ],
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
