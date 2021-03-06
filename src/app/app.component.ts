import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'cuper-front-end';

  constructor(private translate: TranslateService) {
    this.initTranslate();
  }

  ngOnInit() { }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    const language = this.translate.getBrowserLang();

    if (language !== undefined) {
      this.translate.use(language);
    } else {
      this.translate.use('en');
    }
  }
}
