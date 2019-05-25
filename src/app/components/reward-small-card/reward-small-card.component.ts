import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cuper-reward-small-card',
  templateUrl: './reward-small-card.component.html',
  styleUrls: ['./reward-small-card.component.scss']
})
export class RewardSmallCardComponent implements OnInit {
  private defaultImage = '../../../../assets/images/logo-club.svg';

  @Input() imageSrc: string;
  @Input() text: string;
  @Input() onClick: Function = () => null;

  constructor() { }

  ngOnInit() {
    this.imageSrc = this.imageSrc || this.defaultImage;
  }

}
