import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface FileOptions {
  file?: File;
  imageBase64?: string | ArrayBuffer;
}

@Component({
  selector: 'cuper-preview-reward',
  templateUrl: './preview-reward.component.html',
  styleUrls: ['./preview-reward.component.scss']
})
export class PreviewRewardComponent implements OnInit {
  placeholder: string = '../../../assets/images/background-reward.png';

  constructor() { }

  @Input() file: string | ArrayBuffer;
  @Input() companyAvatar: string;
  @Input() companyName: string;
  @Input() promotionTitle: string;
  @Input() disableEvents: boolean = false;
  @Output() propagateFile = new EventEmitter<FileOptions>();

  ngOnInit() {
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
    const uploadComponent = document.getElementById(`uploader`);
    uploadComponent.click();
  }

}
