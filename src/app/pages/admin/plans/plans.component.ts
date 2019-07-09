import { Component, OnInit } from '@angular/core';
import { Plan } from '../../../models';
import { AdminPlanService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cuper-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];
  currentIndex: -1;
  loaded: boolean = false;

  constructor(
    private planService: AdminPlanService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(data => {
      console.log('data: ', data);

      this.plans = data['plans'];
      this.loaded = true;
    });
  }

}
