import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss']
})
export class CheckmarkComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() classes: string;

  constructor() { }

  ngOnInit(): void {
  }

}
