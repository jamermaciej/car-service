import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';

import { CarServiceTableComponent } from './car-service-table.component';

describe('CarServiceTableComponent', () => {
  let component: CarServiceTableComponent;
  let fixture: ComponentFixture<CarServiceTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarServiceTableComponent ],
      imports: [ ReactiveFormsModule, TranslocoModule ],
      providers: [ provideMockStore({}) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
