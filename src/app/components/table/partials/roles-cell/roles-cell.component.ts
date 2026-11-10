import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'cuper-roles-cell',
    templateUrl: './roles-cell.component.html',
    styleUrls: ['./roles-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RolesCellComponent implements OnInit {
  @Input() data: { permisions?: { is_cashier?: boolean; is_partner?: boolean; is_admin?: boolean } };

  constructor() { }

  ngOnInit() {
  }

}
