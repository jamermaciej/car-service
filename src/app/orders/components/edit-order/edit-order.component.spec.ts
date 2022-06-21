import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-order.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditOrderComponent', () => {
  let component: EditOrderComponent;
  let fixture: ComponentFixture<EditOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, TranslocoModule, MatSelectModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
