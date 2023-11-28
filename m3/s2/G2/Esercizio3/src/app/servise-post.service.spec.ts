import { TestBed } from '@angular/core/testing';

import { ServisePostService } from './servise-post.service';

describe('ServisePostService', () => {
  let service: ServisePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServisePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
