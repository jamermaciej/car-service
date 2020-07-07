import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isMenuOpen = true;
  contentMargin = 260;
  animateNavbar = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToolbarMenuToggle(isMenuOpen: boolean) {
    this.animateNavbar = true;
    this.isMenuOpen = isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 80;
    } else {
      this.contentMargin = 260;
    }
  }
}
