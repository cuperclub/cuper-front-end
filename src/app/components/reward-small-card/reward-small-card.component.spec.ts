import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardSmallCardComponent } from './reward-small-card.component';

describe('RewardSmallCardComponent', () => {
  let component: RewardSmallCardComponent;
  let fixture: ComponentFixture<RewardSmallCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardSmallCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
