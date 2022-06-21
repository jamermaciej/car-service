import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { EditCarComponent } from './edit-car.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('EditCarComponent', () => {
  let component: EditCarComponent;
  let fixture: ComponentFixture<EditCarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, TranslocoTestingModule, MatAutocompleteModule ],
      providers: [ provideMockStore({ }) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
