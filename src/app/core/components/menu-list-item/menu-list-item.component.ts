import { Store } from '@ngrx/store';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { NavItem } from 'src/app/shared/models/nav-item.model';
import * as routerActions from './../../../store/actions/router.actions';
import * as fromRoot from './../../../store/reducers';
import { TranslocoService } from '@ngneat/transloco';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth = 0;

  constructor(public router: Router,
              private sidenavService: SidenavService,
              private store: Store<fromRoot.State>
            ) {}

  ngOnInit(): void {
    this.sidenavService.currentUrlSubject$.subscribe((url: string) => {
      if (this.item.route && url ) {
        this.expanded = url.indexOf(`${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if ( !item.children || !item.children.length ) {
      this.store.dispatch(routerActions.go({ path: [item.route] }));

      if ( !this.sidenavService.sidenav.mode ) {
        this.sidenavService.closeSidenav();
      }
    }

    if ( item.children && item.children.length ) {
      this.expanded = !this.expanded;
      this.ariaExpanded = this.expanded;
    }
  }
}
