import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'cuper-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
