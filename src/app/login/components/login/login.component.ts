import { Creditionals } from './../../../shared/models/creditionals.model';
import { FlowRoutes } from './../../../core/enums/flow';
import { UserService } from './../../../core/services/user/user.service';
import { RequiredValidator } from './../../../shared/validators/required-validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  flowRoutes = FlowRoutes;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [RequiredValidator.required, Validators.email]],
      password: ['', [RequiredValidator.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const creditionals  = this.loginForm.value;
      this.store.dispatch(login(creditionals));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
