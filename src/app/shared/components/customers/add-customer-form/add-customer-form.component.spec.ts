import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslocoModule } from '@ngneat/transloco';
import { AddCustomerFormComponent } from './add-customer-form.component';

describe('AddCustomerFormComponent', () => {
  let component: AddCustomerFormComponent;
  let fixture: ComponentFixture<AddCustomerFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule, TranslocoModule, MatAutocompleteModule ],
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
