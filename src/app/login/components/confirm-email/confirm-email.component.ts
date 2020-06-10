import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  code: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParams['oobCode'];
    if (!this.code) return;
    this.userService.confirmEmail(this.code);
  }

}
