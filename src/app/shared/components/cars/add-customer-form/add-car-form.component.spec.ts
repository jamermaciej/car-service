import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCarFormComponent } from './add-customer-car.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('AddCarFormComponent', () => {
  let component: AddCarFormComponent;
  let fixture: ComponentFixture<AddCarFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule, TranslocoModule, MatAutocompleteModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
