import { TestBed } from '@angular/core/testing';

import { FireStoreService } from './fire-store.service';

describe('FireStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireStoreService = TestBed.get(FireStoreService);
    expect(service).toBeTruthy();
  });
});
