import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardCounterComponent } from './card-counter.component';

describe('CardCounterComponent', () => {
  let component: CardCounterComponent;
  let fixture: ComponentFixture<CardCounterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
