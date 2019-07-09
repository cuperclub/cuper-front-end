import { Component, OnInit } from '@angular/core';
import { Plan } from '../../../models';
import { AdminPlanService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import {PlanFormComponent} from '../../../components/plan-form/plan-form.component'

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
      const plans = data['plans'] || [];
      this.plans = this.formatPlanCardData(plans);
      this.loaded = true;
    });
  }

  formatPlanCardData(plans) {
    return plans.map((plan)=>{
      return {
        time: plan.days + " days",
        price: plan.price,
        promotion: plan.name
      }
    });
  }

  editPlan(plan, index) {
    this.currentIndex = index
    const dialogRef = this.dialog.open(PlanFormComponent, {
      width: '300px',
      data: {
        plan: Object.assign({}, plan)
      }
    });

    dialogRef.beforeClosed().subscribe(plan => {
      if(plan){
        this.plans[this.currentIndex] = plan;
      }
    });
  }

  addPlan(){
    const dialogRef = this.dialog.open(PlanFormComponent, {
      width: '300px',
      data: {
        plan: {},
        new: true
      }
    });

    dialogRef.beforeClosed().subscribe(plan => {
      if(plan){
        this.plans.push(plan);
      }
    });
  }
}
