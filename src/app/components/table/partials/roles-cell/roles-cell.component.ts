import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cuper-roles-cell',
  templateUrl: './roles-cell.component.html',
  styleUrls: ['./roles-cell.component.scss']
})
export class RolesCellComponent implements OnInit {
  @Input() data: Object;

  constructor() { }

  ngOnInit() {
  }

}
