import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    const appTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data?.title) {
            return child.snapshot.data.title;
          } else {
            return appTitle;
          }
        }
        return appTitle;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(`${data} - Car Service`);
      }
    });
  }
}
