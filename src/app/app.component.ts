import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('langSelect') langSelect: MatSelect;

  constructor(public translate: TranslateService) { }

  changeLang() {
    const lang = this.langSelect.value;
    this.translate.use(lang);
  }
}
