
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  @ViewChild('langSelect') langSelect: MatSelect;
  currentLang: string;
  langs: string[] | object[];

  constructor(public translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.currentLang = this.translocoService.getActiveLang();
    this.langs = this.translocoService.getAvailableLangs();
  }

  changeLang() {
    const lang = this.langSelect.value;
    this.currentLang = lang;
    this.translocoService.setActiveLang(lang);
  }
}
