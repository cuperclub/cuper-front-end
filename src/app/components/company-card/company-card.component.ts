import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../../models';
import { CompanyFormComponent } from '../company-form/company-form.component';

@Component({
  selector: 'cuper-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() company: Company;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  editCompany() {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      width: '400px',
      data: {
        company: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
