import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isMenuOpen = true;
  contentMargin = 260;
  animateNavbar = false;
  isMobile: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  mode: string;
  opened: boolean;

  constructor(private platform: Platform) {
    this.isMobile = this.platform.IOS || this.platform.ANDROID;
    this.mode = this.isMobile ? '' : 'side';
    this.opened = this.isMobile ? false : true;
  }

  ngOnInit(): void {
  }

  onToolbarMenuToggle(isMenuOpen: boolean) {
    if (this.isMobile) {
      this.sidenav.toggle();
      return false;
    }

    this.animateNavbar = true;
    this.isMenuOpen = isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 80;
    } else {
      this.contentMargin = 260;
    }
  }
}
