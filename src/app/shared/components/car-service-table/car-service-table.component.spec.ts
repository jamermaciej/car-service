import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarServiceTableComponent } from './car-service-table.component';

describe('CarServiceTableComponent', () => {
  let component: CarServiceTableComponent;
  let fixture: ComponentFixture<CarServiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarServiceTableComponent ]
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
