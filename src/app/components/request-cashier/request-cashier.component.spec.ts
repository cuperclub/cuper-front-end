import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCashierComponent } from './request-cashier.component';

describe('RequestCashierComponent', () => {
  let component: RequestCashierComponent;
  let fixture: ComponentFixture<RequestCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
