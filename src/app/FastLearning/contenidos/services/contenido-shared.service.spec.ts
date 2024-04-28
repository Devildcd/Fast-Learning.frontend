import { TestBed } from '@angular/core/testing';

import { ContenidoSharedService } from './contenido-shared.service';

describe('ContenidoSharedService', () => {
  let service: ContenidoSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenidoSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
