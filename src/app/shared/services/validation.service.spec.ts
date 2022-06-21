import { TestBed } from '@angular/core/testing';
import { TranslocoModule } from '@ngneat/transloco';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoModule ]
    });
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
