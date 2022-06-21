import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AddCustomerModalComponent } from './add-customer-modal.component';
import { Actions } from '@ngrx/effects';
import { TranslocoModule } from '@ngneat/transloco';

describe('AddCustomerModalComponent', () => {
  let component: AddCustomerModalComponent;
  let fixture: ComponentFixture<AddCustomerModalComponent>;
  let store: MockStore;
  let actions: Actions;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerModalComponent ],
      imports: [ MatDialogModule, TranslocoModule ],
      providers: [ provideMockStore(), provideMockActions(() => actions), { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    actions = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
