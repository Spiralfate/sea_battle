import { TestBed, inject } from '@angular/core/testing';

import { TurnTakerService } from './turn-taker.service';

describe('TurnTakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnTakerService]
    });
  });

  it('should be created', inject([TurnTakerService], (service: TurnTakerService) => {
    expect(service).toBeTruthy();
  }));
});
