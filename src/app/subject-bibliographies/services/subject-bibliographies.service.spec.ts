import { TestBed } from '@angular/core/testing';

import { SubjectBibliographiesService } from './subject-bibliographies.service';

describe('SubjectBibliographiesService', () => {
  let service: SubjectBibliographiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectBibliographiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
