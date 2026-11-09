import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BillingCardComponent } from './billing-card.component';

describe('BillingCardComponent', () => {
  let component: BillingCardComponent;
  let fixture: ComponentFixture<BillingCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDividerModule,
        TranslateModule.forRoot(),
      ],
      declarations: [BillingCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const translate = TestBed.get(TranslateService);
    translate.setTranslation('en', {
      company: {
        billing_info: 'Billing information',
        legal_representative: 'Legal representative',
        ruc: 'RUC',
        contributor_type: 'Contributor type',
        economic_activity: 'Economic activity'
      },
      common: { not_registered_yet: 'Not registered yet' }
    });
    translate.use('en');
    fixture = TestBed.createComponent(BillingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Billing information');
    expect(content).toContain('Not registered yet');
  });
});
