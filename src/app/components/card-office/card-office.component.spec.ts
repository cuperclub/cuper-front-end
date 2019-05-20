import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfficeComponent } from './card-office.component';

describe('CardOfficeComponent', () => {
  let component: CardOfficeComponent;
  let fixture: ComponentFixture<CardOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
