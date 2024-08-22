import { TestBed } from '@angular/core/testing';

import { SubjectIdSourceService } from './subject-id-source.service';

describe('SubjectIdSourceService', () => {
  let service: SubjectIdSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectIdSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
