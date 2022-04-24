
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  @ViewChild('langSelect') langSelect: MatSelect;
  currentLang: string;
  langs: string[] | object[];

  constructor(public translocoService: TranslocoService, private localize: LocalizeRouterService) { }

  ngOnInit(): void {
    this.currentLang = this.translocoService.getActiveLang();
    this.langs = this.translocoService.getAvailableLangs();
  }

  changeLang() {
    const lang = this.langSelect.value;
    this.currentLang = lang;
    this.translocoService.setActiveLang(lang);
    this.localize.changeLanguage(this.localize.parser.currentLang === 'pl' ? 'en' : 'pl', { replaceUrl: true });
  }
}
