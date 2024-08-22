import { TestBed } from '@angular/core/testing';

import { SubjectContentService } from './subject-content.service';

describe('SubjectContentService', () => {
  let service: SubjectContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
