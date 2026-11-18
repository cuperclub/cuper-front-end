import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PaginationDefinition } from '../table/table.component';
import { MatCard } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatPaginator } from '@angular/material/paginator';

interface OptionRow {
  title: string;
  description: string;
  image: string;
  number: number;
  text: string;
}

@Component({
    selector: 'cuper-table-card',
    templateUrl: './table-card.component.html',
    styleUrls: ['./table-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, NgFor, AvatarComponent, NgIf, MatPaginator]
})
export class TableCardComponent implements OnInit {
  @Input() items: OptionRow[];
  @Input() onClick: Function;
  @Input() indexActive: number = -1;
  @Input() pagniationOptions: PaginationDefinition;
  defaultImage = '../../../../assets/images/background-reward.png';

  constructor() {
    this.items = this.items;
  }

  ngOnInit() {
  }

}
