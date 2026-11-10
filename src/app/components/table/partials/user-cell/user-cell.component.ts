import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cuper-user-cell',
    templateUrl: './user-cell.component.html',
    styleUrls: ['./user-cell.component.scss'],
    standalone: false
})
export class UserCellComponent implements OnInit {
  @Input() data: { user?: { name?: string; email?: string } };

  constructor() { }

  ngOnInit() {
  }

}
