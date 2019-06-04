import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRewardCardComponent } from './new-reward-card.component';

describe('NewRewardCardComponent', () => {
  let component: NewRewardCardComponent;
  let fixture: ComponentFixture<NewRewardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRewardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRewardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
