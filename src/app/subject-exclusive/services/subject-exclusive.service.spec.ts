import { TestBed } from '@angular/core/testing';

import { SubjectExclusiveService } from './subject-exclusive.service';

describe('SubjectExclusiveService', () => {
  let service: SubjectExclusiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectExclusiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
