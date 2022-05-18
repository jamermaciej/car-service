import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAmountComponent } from './orders-amount.component';

describe('OrdersAmountComponent', () => {
  let component: OrdersAmountComponent;
  let fixture: ComponentFixture<OrdersAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
