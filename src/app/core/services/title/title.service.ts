import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title)
            { }

  changeTittle() {
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
