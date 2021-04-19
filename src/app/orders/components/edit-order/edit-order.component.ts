import { FlowRoutes } from './../../../core/enums/flow';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getOrder } from '../../store/selectors/orders.selectors';
import { Observable, Subject } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { takeUntil } from 'rxjs/operators';
import { go } from 'src/app/store';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<any> = new Subject();
  order: Order;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.select(getOrder, { id }).pipe(
      takeUntil(this.destroySubject$)
    ).subscribe(order => {
      if ( order ) {
        this.order = order;
      } else {
        this.store.dispatch(go({ path: [FlowRoutes.ORDERS] }));
      }
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
