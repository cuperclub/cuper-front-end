import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cuper-preview-reward',
  templateUrl: './preview-reward.component.html',
  styleUrls: ['./preview-reward.component.scss']
})
export class PreviewRewardComponent implements OnInit {

  constructor() { }

  @Input() file: string | ArrayBuffer;
  @Input() companyAvatar: string;
  @Input() companyName: string;
  @Input() promotionDescription: string;
  @Input() disableEvents: boolean = false;

  ngOnInit() {
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
