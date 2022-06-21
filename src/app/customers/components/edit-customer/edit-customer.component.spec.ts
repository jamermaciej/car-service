import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';

import { EditCustomerComponent } from './edit-customer.component';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, TranslocoModule, MatAutocompleteModule ],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '24fkzrw3487943uf358lovd' } }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
