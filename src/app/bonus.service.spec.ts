import { TestBed, inject } from '@angular/core/testing';

import { BonusService } from './bonus.service';

describe('BonusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BonusService]
    });
  });

  it('should ...', inject([BonusService], (service: BonusService) => {
    expect(service).toBeTruthy();
  }));
});
