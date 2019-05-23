import { Component, OnInit, Input } from '@angular/core';

interface Box {
  height: string;
  width: string;
}

@Component({
  selector: 'cuper-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() imageSrc: string;
  @Input() size: number = 60;

  constructor() { }

  ngOnInit() {
  }

  buildStyle(): Box {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`,
    };
  }
}
