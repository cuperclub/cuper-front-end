import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTransactionFormComponent } from './input-transaction-form.component';

describe('InputTransactionFormComponent', () => {
  let component: InputTransactionFormComponent;
  let fixture: ComponentFixture<InputTransactionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTransactionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
