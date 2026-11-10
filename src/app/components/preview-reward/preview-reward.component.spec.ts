import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreviewRewardComponent } from './preview-reward.component';
import { AvatarComponent } from '../avatar/avatar.component';


describe('PreviewRewardComponent', () => {
  let component: PreviewRewardComponent;
  let fixture: ComponentFixture<PreviewRewardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [PreviewRewardComponent, AvatarComponent]
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
