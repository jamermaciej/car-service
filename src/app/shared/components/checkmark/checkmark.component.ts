import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckmarkComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() classes: string;

  constructor() { }

  ngOnInit(): void {
  }

}
