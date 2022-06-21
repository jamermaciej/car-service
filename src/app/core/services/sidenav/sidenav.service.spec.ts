import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(SidenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
