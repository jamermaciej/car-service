import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toolbarMenuToggle = new EventEmitter<boolean>();
  isMenuOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toolbarMenuToggle.emit(this.isMenuOpen);
  }
}
