import { Component, OnInit, Input } from '@angular/core';
import { Promotion } from 'src/app/models';

@Component({
  selector: 'cuper-reward-small-card',
  templateUrl: './reward-small-card.component.html',
  styleUrls: ['./reward-small-card.component.scss']
})
export class RewardSmallCardComponent implements OnInit {
  private defaultImage = '../../../../assets/images/background-reward.png';

  @Input() reward: Promotion;
  @Input() onClick: Function;

  imageSrc: string;
  text: string;

  constructor() { }

  ngOnInit() {
    this.imageSrc = this.reward.image || this.defaultImage;
    this.text = this.reward.title || '';
  }

}
