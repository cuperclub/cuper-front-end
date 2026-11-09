import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SquareSelectComponent } from './square-select.component';

describe('SquareSelectComponent', () => {
  let component: SquareSelectComponent;
  let fixture: ComponentFixture<SquareSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
