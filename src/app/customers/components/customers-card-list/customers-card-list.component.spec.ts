import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

import { CustomersCardListComponent } from './customers-card-list.component';

const dummyCustomerListResponse = [
  {address:
    [{street:"aas",
    city:"Gorlice",
    postcode:"38-300",
    province:"małopolska"
  }],
  addressHtml: "aas, Gorlice, 38-300, małopolska",
  name:"Piotr",
  surname:"Kosok",
  phoneNumber:"4123213",
  idNumber:"SAD34234",
  email:"piko@gmail.com",
  id:20,
},
{address:
  [{street:"Biecka 44",
  city:"Szczecin",
  postcode:"86-645",
  province:"zachodniopomorskie"}],
  addressHtml: "aas, Gorlice, 38-300, małopolska",
  name:"Seba",
  surname:"gdfg",
  phoneNumber:"666342344",
  idNumber:"dfgdfg",
  email:"sprz@gmail.com",
  id:36,},
  {address:
    [{street:"Konopnicka 3",
    city:"Katowice",
    postcode:"67-322",
    province:"małopolska"}],
    addressHtml: "aas, Gorlice, 38-300, małopolska",
    name:"Jakub",
    surname:"Jamer",
    phoneNumber:"654234123",
    idNumber:"qqqqq",
    email:"jpr43@interia.pl",
    id:46,},
  {address:
    [{street:"Łużna 45",
    city:"Łużna",
    postcode:"38-322",
    province:"małopolska"}],
    addressHtml: "aas, Gorlice, 38-300, małopolska",
    name:"Maciej",
    surname:"Jamer",
    phoneNumber:"612442658",
    idNumber:"56565656",
    email:"maciek77jamer@gmail.com",
    id:63,
  }
];

describe('CustomersCardListComponent', () => {
  let component: CustomersCardListComponent;
  let fixture: ComponentFixture<CustomersCardListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersCardListComponent ],
      imports: [ MatCardModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCardListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the customers list', () => {
    component.customers = dummyCustomerListResponse;

    fixture.detectChanges();

    const customers = el.queryAll(By.css(".customer-card"));

    expect(customers).toBeTruthy("Could not find customers");
    expect(customers.length).toBe(4, "Unexpected number of courses");
  });

  it('should display the first customers', () => {
    component.customers = dummyCustomerListResponse;

    fixture.detectChanges();

    const customer = component.customers[0];

    const card = el.query(By.css(".customer-card:first-child")),
          title = card.query(By.css("mat-card-title"));

    expect(card).toBeTruthy("Could not find customer card");

    expect(title.nativeElement.textContent).toBe(customer.name);
  });

});
