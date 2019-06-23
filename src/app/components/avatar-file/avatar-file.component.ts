import { Component, OnInit, Input } from '@angular/core';

interface Box {
  height: string;
  width: string;
}

@Component({
  selector: 'cuper-avatar-file',
  templateUrl: './avatar-file.component.html',
  styleUrls: ['./avatar-file.component.scss']
})
export class AvatarFileComponent implements OnInit {

  private defaultImage = '../../../../assets/images/avatars/0.png';

  @Input() file: string | ArrayBuffer;
  @Input() size: number = 60;

  constructor() { }

  ngOnInit() {
    this.file = this.file || this.defaultImage;
  }

  buildStyle(): Box {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`,
    };
  }

  onFileChange(event): void {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.file = reader.result;
      };
    }
  }

  openUploader(): void {
    const uploadComponent = document.getElementById(`uploader`);
    uploadComponent.click();
  }
}

