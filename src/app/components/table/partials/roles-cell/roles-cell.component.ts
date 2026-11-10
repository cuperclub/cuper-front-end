import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cuper-roles-cell',
    templateUrl: './roles-cell.component.html',
    styleUrls: ['./roles-cell.component.scss'],
    standalone: false
})
export class RolesCellComponent implements OnInit {
  @Input() data: { permisions?: { is_cashier?: boolean; is_partner?: boolean; is_admin?: boolean } };

  constructor() { }

  ngOnInit() {
  }

}
