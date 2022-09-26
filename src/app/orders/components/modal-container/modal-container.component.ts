import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { LocalizeRouterService } from '@penleychan/ngx-transloco-router';

@Component({
  selector: 'app-modal-container',
  template: '',
})
export class ModalContainerComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private localize: LocalizeRouterService) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => this.openDialog(data));
  }

  openDialog(data: Data): void {
    const dialogRef = this.dialog.open(data.component, {
      panelClass: data.panelClass,
      autoFocus: data.autoFocus,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const translatedRoute = this.localize.translateRoute(['/orders/add/']);
        this.router.navigate([...translatedRoute]);
      }
    });
  }

}
