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

  private defaultImage = '../../../../assets/images/avatars/0.png';

  @Input() imageSrc: string;
  @Input() size: number = 60;

  constructor() { }

  ngOnInit() {
    this.imageSrc = this.imageSrc || this.defaultImage;
  }

  buildStyle(): Box {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`,
    };
  }
}
