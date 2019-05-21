import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../app/material.module';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { CardUserComponent } from './card-user.component';

describe('CardUserComponent', () => {
  let component: CardUserComponent;
  let fixture: ComponentFixture<CardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forChild(),
      ],
      declarations: [ CardUserComponent ],
      providers: [ TranslateStore ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
