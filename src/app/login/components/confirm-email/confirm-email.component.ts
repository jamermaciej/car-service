import { confirmEmail } from './../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['userId'];
    const code = this.activatedRoute.snapshot.params['code'];

    if (!userId || !code) return;

    this.store.dispatch(confirmEmail({ userId, code }));
  }

}
