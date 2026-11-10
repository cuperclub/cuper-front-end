import {
  Component,
  OnDestroy,
  Input,
  ViewChild,
  ViewContainerRef,
  AfterContentInit,
  Type,
  ComponentRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'cuper-cell-table',
    templateUrl: './cell-table.component.html',
    styleUrls: ['./cell-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CellTableComponent implements OnDestroy, AfterContentInit {
  @Input() data: Object;
  @Input() type: Type<Component>;
  @ViewChild('content', { read: ViewContainerRef, static: true }) content;
  componentRef: ComponentRef<Component>;

  ngAfterContentInit() {
    this.componentRef = this.content.createComponent(this.type);
    this.componentRef.instance['data'] = this.data;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
