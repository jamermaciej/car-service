import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckmarkComponent {
  @Input() isChecked: boolean;
  @Input() classes: string;

  constructor() { }

}
