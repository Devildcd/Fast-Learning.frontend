import { TestBed } from '@angular/core/testing';

import { SubjectErrorService } from './subject-error.service';

describe('SubjectErrorService', () => {
  let service: SubjectErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
