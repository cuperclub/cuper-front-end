import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';

export interface ActionDefinition {
  label: string;
  displayName: string;
  action: Function;
}

@Component({
    selector: 'cuper-actions-cell',
    templateUrl: './actions-cell.component.html',
    styleUrls: ['./actions-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIconButton, MatMenuTrigger, MatIcon, MatMenu, NgFor, MatMenuItem]
})
export class ActionsCellComponent implements OnInit {
  @Input() data: { actions?: ActionDefinition[] };
  @Input() options: ActionDefinition [];

  constructor() { }

  ngOnInit() {
  }

}
