import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'cuper-placeholder-card',
    templateUrl: './placeholder-card.component.html',
    styleUrls: ['./placeholder-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PlaceholderCardComponent implements OnInit {
  @Input() icon: string = 'add';
  @Input() text: string;
  @Input() onClick: Function;

  constructor() { }

  ngOnInit() {
  }

}
