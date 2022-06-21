import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
