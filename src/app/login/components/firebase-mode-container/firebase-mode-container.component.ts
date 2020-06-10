import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-mode-container',
  templateUrl: './firebase-mode-container.component.html',
  styleUrls: ['./firebase-mode-container.component.scss']
})
export class FirebaseModeContainerComponent implements OnInit {
  mode: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.queryParams.pipe(map(param => param.mode));
  }

}
