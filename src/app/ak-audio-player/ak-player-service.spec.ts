import { TestBed } from '@angular/core/testing';

import { AkPlayerService } from './ak-player-service';

describe('AkPlayerServiceService', () => {
  let service: AkPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AkPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
