import { TestBed } from '@angular/core/testing';

import { ContentLevelService } from './content-level.service';

describe('ContentLevelService', () => {
  let service: ContentLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
