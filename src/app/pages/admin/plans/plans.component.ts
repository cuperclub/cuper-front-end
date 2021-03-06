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
  plansCard: any = [];
  currentIndex: -1;
  loaded: boolean = false;

  constructor(
    private planService: AdminPlanService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(data => {
      this.plans = data['plans'] || [];
      this.plansCard = this.planService.plansForCard(this.plans);
      this.loaded = true;
    });
  }

  editPlan(index) {
    this.currentIndex = index
    const dialogRef = this.dialog.open(PlanFormComponent, {
      width: '300px',
      data: {
        plan: Object.assign({}, this.plans[index])
      }
    });

    dialogRef.beforeClosed().subscribe(plan => {
      if(plan){
        this.plans[this.currentIndex] = plan;
        this.plansCard[this.currentIndex] = this.planService.planForCard(plan);
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
        this.plansCard.push(this.planService.planForCard(plan));
      }
    });
  }
}
