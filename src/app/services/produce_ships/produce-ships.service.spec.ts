import { TestBed, inject } from '@angular/core/testing';

import { ProduceShipsService } from './produce-ships.service';

describe('ProduceShipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduceShipsService]
    });
  });

  it('should be created', inject([ProduceShipsService], (service: ProduceShipsService) => {
    expect(service).toBeTruthy();
  }));
});
