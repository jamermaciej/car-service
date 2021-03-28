import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toolbarMenuToggle = new EventEmitter<boolean>();
  isMenuOpen = true;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toolbarMenuToggle.emit(this.isMenuOpen);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
