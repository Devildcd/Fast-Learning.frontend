import { TestBed } from '@angular/core/testing';

import { ContentTypesService } from './content-types.service';

describe('ContentTypesService', () => {
  let service: ContentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
