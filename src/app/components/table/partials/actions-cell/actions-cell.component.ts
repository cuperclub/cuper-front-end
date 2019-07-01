import { Component, OnInit, Input } from '@angular/core';

export interface ActionDefinition {
  label: string;
  displayName: string;
  action: Function;
}

@Component({
  selector: 'cuper-actions-cell',
  templateUrl: './actions-cell.component.html',
  styleUrls: ['./actions-cell.component.scss']
})
export class ActionsCellComponent implements OnInit {
  @Input() data: Object;
  @Input() options: ActionDefinition [];

  constructor() { }

  ngOnInit() {
  }

}
