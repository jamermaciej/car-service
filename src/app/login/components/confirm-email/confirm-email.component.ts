import { confirmEmail } from './../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  code: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParams['oobCode'];
    if (!this.code) return;
    const code = this.code;
    this.store.dispatch(confirmEmail({ code }));
  }

}
