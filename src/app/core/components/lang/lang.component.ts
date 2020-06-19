import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  @ViewChild('langSelect') langSelect: MatSelect;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  changeLang() {
    const lang = this.langSelect.value;
    this.translate.use(lang);
  }
}
