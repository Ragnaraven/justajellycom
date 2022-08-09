import { TestBed } from '@angular/core/testing';

import { AkPlayerServiceService } from './ak-player-service.service';

describe('AkPlayerServiceService', () => {
  let service: AkPlayerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AkPlayerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
