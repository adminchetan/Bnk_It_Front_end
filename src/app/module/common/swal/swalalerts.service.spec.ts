import { TestBed } from '@angular/core/testing';

import { SwalalertsService } from './swalalerts.service';

describe('SwalalertsService', () => {
  let service: SwalalertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalalertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
