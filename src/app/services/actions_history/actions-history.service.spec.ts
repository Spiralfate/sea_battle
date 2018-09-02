import { TestBed, inject } from '@angular/core/testing';

import { ActionsHistoryService } from './actions-history.service';

describe('ActionsHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsHistoryService]
    });
  });

  it('should be created', inject([ActionsHistoryService], (service: ActionsHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
