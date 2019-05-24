import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app/material.module';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { BillingCardComponent } from './billing-card.component';

describe('BillingCardComponent', () => {
  let component: BillingCardComponent;
  let fixture: ComponentFixture<BillingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forChild(),
      ],
      declarations: [BillingCardComponent],
      providers: [TranslateStore]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
