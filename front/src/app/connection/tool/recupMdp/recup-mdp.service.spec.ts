import { TestBed } from '@angular/core/testing';

import { RecupMdpService } from './recup-mdp.service';

describe('RecupMdpService', () => {
  let service: RecupMdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupMdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
