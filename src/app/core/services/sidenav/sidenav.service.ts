import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, Event, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  sidenav: MatSidenav;
  currentUrlSubject$ = new BehaviorSubject<string>(undefined);
  public currentUrl$: Observable<string> = this.currentUrlSubject$.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrlSubject$.next(event.urlAfterRedirects);
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
