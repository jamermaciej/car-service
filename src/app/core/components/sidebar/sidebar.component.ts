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
  @Output() closeSidenav = new EventEmitter<void>();
  user: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user$;
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
