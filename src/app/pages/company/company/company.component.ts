import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTabNav, MatTabLink } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTabNav, MatTabLink, RouterLink, RouterLinkActive, RouterOutlet, TranslateModule]
})
export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
