import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

interface Box {
  height: string;
  width: string;
}

interface FileOptions {
  file?: File;
  imageBase64?: string | ArrayBuffer;
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
  @Input() isLoading: boolean = false;
  @Output() propagateFile = new EventEmitter<FileOptions>();

  constructor(
    private elRef: ElementRef,
  ) { }

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
        const uploadFile = { file: file, imageBase64: reader.result };
        this.propagateFile.emit(uploadFile);
        this.file = reader.result;
      };
    }
  }

  openUploader(): void {
    const uploadComponent = this.elRef.nativeElement.querySelector('input');
    if(!this.isLoading) uploadComponent.click();
  }
}
