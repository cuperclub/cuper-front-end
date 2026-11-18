import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-control-messages',
    templateUrl: './control-messages.component.html',
    styleUrls: ['./control-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgIf, TranslateModule]
})
export class ControlMessagesComponent implements OnInit {

  @Input() control: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

}
