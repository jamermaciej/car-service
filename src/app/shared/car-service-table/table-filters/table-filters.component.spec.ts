import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { TableFiltersComponent } from './table-filters.component';

describe('TableFiltersComponent', () => {
  let component: TableFiltersComponent;
  let fixture: ComponentFixture<TableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFiltersComponent ],
      imports: [ ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, BrowserAnimationsModule ],
      providers: [  provideMockStore({}) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
