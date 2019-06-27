import {
  Component,
  OnDestroy,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterContentInit,
  Type,
  ComponentRef
} from '@angular/core';

@Component({
  selector: 'cuper-cell-table',
  templateUrl: './cell-table.component.html',
  styleUrls: ['./cell-table.component.scss']
})
export class CellTableComponent implements OnDestroy, AfterContentInit {
  @Input() data: Object;
  @Input() type: Type<Component>;
  @ViewChild('content', {read: ViewContainerRef}) content;
  componentRef: ComponentRef<Component>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit() {
    const resolverFactory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.componentRef = this.content.createComponent(resolverFactory);
    this.componentRef.instance['data'] = this.data;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
