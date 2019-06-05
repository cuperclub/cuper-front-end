import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../../models';
import { CompanyService} from 'src/app/services';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  myCompany$: Observable<Company>;

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.myCompany$ = this.companyService.getMyCompany();
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
