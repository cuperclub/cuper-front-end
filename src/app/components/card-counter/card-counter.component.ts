import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'cuper-card-counter',
    templateUrl: './card-counter.component.html',
    styleUrls: ['./card-counter.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class CardCounterComponent implements OnInit {
  @Input() title: string;
  @Input() count: number;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
