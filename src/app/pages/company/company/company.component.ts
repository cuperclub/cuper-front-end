import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'cuper-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
