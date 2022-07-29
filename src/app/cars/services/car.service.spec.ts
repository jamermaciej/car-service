import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarService } from './car.service';
import { Car } from 'src/app/shared/models/car.model';
import { HttpResponse } from '@angular/common/http';

const dummyCarListResponse = [
      {
        brand: "Matiz",
        capacity: "1.0",
        fuel: "Diesel",
        id: 1,
        mileage: "200 000",
        model: "Deu",
        power: "98",
        registration: "KR230DA",
        type: "Kombi",
        vin: "42SAD42DD3",
        year: "2000"
      },
      {
        brand: "Audi",
        capacity: "2.0",
        fuel: "Petrol",
        id: 2,
        mileage: "200 000",
        model: "B5",
        power: "200",
        registration: "KGR21F40",
        type: "Sedan",
        vin: "VF324SS44",
        year: "2010",
      },
      {
        brand: "Pegeot",
        capacity: "2.0",
        fuel: "Petrol",
        id: 3,
        mileage: "210000",
        model: "4-7",
        power: "130",
        registration: "KGR2112",
        type: "Sedan",
        vin: "ASDASDASDASD34234",
        year: "2005"
      }
];

const dummyCarResponse = {
    brand: "Pegeot",
    capacity: "2.0",
    fuel: "Petrol",
    id: 3,
    mileage: "210000",
    model: "4-7",
    power: "130",
    registration: "KGR2112",
    type: "Sedan",
    vin: "ASDASDASDASD34234",
    year: "2005"
};

describe('CarService', () => {
  let carService: CarService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase), RouterTestingModule, MatSnackBarModule, TranslocoModule ],
      providers: [ CarService, provideMockStore({}) ]
    });
    carService = TestBed.inject(CarService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(carService).toBeTruthy();
  });

  it('should retrieve all cars', () => {
    carService.getCars().subscribe(cars => {
        expect(cars).toBeTruthy('No cars returned');
        expect(cars).toEqual(dummyCarListResponse);

        expect(cars.length).toBe(3, 'incorrect number of cars');

        const car = cars.find(car => car.id === 3);

        expect(car.vin).toBe('ASDASDASDASD34234');
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cars`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyCarListResponse);
  });

  it('should find a car by id', () => {
    const id = 3;
    carService.getCar(id).subscribe(car => {
        expect(car).toBeTruthy('No car returned');
        expect(car.id).toBe(3, 'incorrect car id');
        expect(car).toEqual(dummyCarResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cars/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyCarListResponse[2]);
  });

  it('should save the car data', () => {
    const newCar = {
        brand: "Ford",
        capacity: "2.0",
        fuel: "Petrol",
        id: 4,
        mileage: "10000",
        model: "Focus",
        power: "210",
        registration: "KK2112",
        type: "Sedan",
        vin: "A7AHYHD2897",
        year: "2021"
    }

    carService.addCar(newCar).subscribe(car => {
        expect(car).toEqual(newCar, 'should return new car');
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cars`);
    expect(req.request.method).toEqual('POST');

    // expect(req.request.body).toEqual(newCar);

    // const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newCar });
    // req.event(expectedResponse);

    req.flush(newCar);
  });

  it('should update car by id', () => {
    const car = {
        brand: "Matiz",
        capacity: "1.0",
        fuel: "Diesel",
        id: 1,
        mileage: "200 000",
        model: "Deu",
        power: "98",
        registration: "KR230DA",
        type: "Kombi",
        vin: "42SAD42DD3",
        year: "1999"
    }

    carService.updateCar(car).subscribe(car => {
        expect(car.id).toBe(1);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cars/1`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.year).toEqual(car.year);

    req.flush({
        brand: "Matiz",
        capacity: "1.0",
        fuel: "Diesel",
        id: 1,
        mileage: "200 000",
        model: "Deu",
        power: "98",
        registration: "KR230DA",
        type: "Kombi",
        vin: "42SAD42DD3",
        year: "1999"
    });
  });

  it('should update car by id', () => {
    const updatedCar: Car = {
        brand: "Matiz",
        capacity: "1.0",
        fuel: "Diesel",
        id: 1,
        mileage: "200 000",
        model: "Deu",
        power: "98",
        registration: "KR230DA",
        type: "Kombi",
        vin: "42SAD42DD3",
        year: "1999"
    }

    carService.updateCar(dummyCarListResponse[0]).subscribe(car => {
        expect(car).toBe(updatedCar);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cars/1`);
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedCar);
  });

  it('should remove car by id', () => {
    carService.deleteCar(3).subscribe(car => {
        expect(car).toBe(dummyCarListResponse[2]);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/cars/3`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(dummyCarListResponse[2]);
  });

});
