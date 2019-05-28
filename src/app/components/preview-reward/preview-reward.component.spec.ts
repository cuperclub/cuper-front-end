import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRewardComponent } from './preview-reward.component';
import { AvatarComponent } from '../avatar/avatar.component';


describe('PreviewRewardComponent', () => {
  let component: PreviewRewardComponent;
  let fixture: ComponentFixture<PreviewRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewRewardComponent, AvatarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
