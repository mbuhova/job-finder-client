import { TestBed, inject } from '@angular/core/testing';

import { OffersService } from './offers.service';

describe('DeliveriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffersService]
    });
  });

  it('should be created', inject([OffersService], (service: OffersService) => {
    expect(service).toBeTruthy();
  }));
});
