import { TestBed } from '@angular/core/testing';

import { ChangeUserService } from './change-user.service';

describe('ChangeUserService', () => {
  let service: ChangeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
