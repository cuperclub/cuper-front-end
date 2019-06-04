import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models';

@Component({
  selector: 'cuper-new-reward-card',
  templateUrl: './new-reward-card.component.html',
  styleUrls: ['./new-reward-card.component.scss']
})
export class NewRewardCardComponent implements OnInit {
  reward: Promotion = {};

  constructor() { }

  ngOnInit() {
  }

  onSaveReward() {
    console.log('this.reward', this.reward);
  }

}
