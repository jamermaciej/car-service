import { Component } from '@angular/core';
import { TitleService } from './core/services/title/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private titleService: TitleService) {
    this.titleService.changeTittle();
  }
}
