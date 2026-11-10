import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'cuper-control-messages',
    templateUrl: './control-messages.component.html',
    styleUrls: ['./control-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ControlMessagesComponent implements OnInit {

  @Input() control: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

}
