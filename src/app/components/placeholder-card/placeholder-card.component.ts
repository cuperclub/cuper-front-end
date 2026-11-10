import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'cuper-placeholder-card',
    templateUrl: './placeholder-card.component.html',
    styleUrls: ['./placeholder-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon]
})
export class PlaceholderCardComponent implements OnInit {
  @Input() icon: string = 'add';
  @Input() text: string;
  @Input() onClick: Function;

  constructor() { }

  ngOnInit() {
  }

}
