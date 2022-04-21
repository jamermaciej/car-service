import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCustomerFormComponent } from './add-customer-form.component';

describe('AddCustomerFormComponent', () => {
  let component: AddCustomerFormComponent;
  let fixture: ComponentFixture<AddCustomerFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
