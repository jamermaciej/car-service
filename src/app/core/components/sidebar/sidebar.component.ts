import { navItem } from './nav-items';
import { NavItem } from './../../../shared/models/nav-item.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../services/user/user.service';
import { FlowRoutes } from './../../enums/flow';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  flowRoutes = FlowRoutes;
  user: Observable<User>;

  navItems: NavItem[] = navItem;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user$;
  }
}
