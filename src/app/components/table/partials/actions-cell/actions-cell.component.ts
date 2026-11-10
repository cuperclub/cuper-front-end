import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

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
    standalone: false
})
export class ActionsCellComponent implements OnInit {
  @Input() data: { actions?: ActionDefinition[] };
  @Input() options: ActionDefinition [];

  constructor() { }

  ngOnInit() {
  }

}
