import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';

@Component({
    selector: 'cuper-roles-cell',
    templateUrl: './roles-cell.component.html',
    styleUrls: ['./roles-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgIf, MatChipListbox, MatChipOption]
})
export class RolesCellComponent implements OnInit {
  @Input() data: { permisions?: { is_cashier?: boolean; is_partner?: boolean; is_admin?: boolean } };

  constructor() { }

  ngOnInit() {
  }

}
