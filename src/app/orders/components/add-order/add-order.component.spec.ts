import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';

import { AddOrderComponent } from './add-order.component';

describe('AddOrderComponent', () => {
  let component: AddOrderComponent;
  let fixture: ComponentFixture<AddOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderComponent ],
      imports: [ ReactiveFormsModule, MatDialogModule, TranslocoTestingModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, MatCheckboxModule],
      providers: [ provideMockStore({ }), { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
