import { TestBed } from '@angular/core/testing';

import { SweetalertsService } from './sweetalerts.service';

describe('SweetalertsService', () => {
  let service: SweetalertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetalertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
