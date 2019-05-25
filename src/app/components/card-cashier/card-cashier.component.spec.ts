import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCashierComponent } from './card-cashier.component';

describe('CardCashierComponent', () => {
  let component: CardCashierComponent;
  let fixture: ComponentFixture<CardCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCashierComponent ]
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
