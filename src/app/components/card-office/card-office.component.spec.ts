import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app/material.module';
import { CardOfficeComponent } from './card-office.component';

describe('CardOfficeComponent', () => {
  let component: CardOfficeComponent;
  let fixture: ComponentFixture<CardOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
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
