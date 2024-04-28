/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContenidoService } from './contenido.service';

describe('Service: Contenido', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContenidoService]
    });
  });

  it('should ...', inject([ContenidoService], (service: ContenidoService) => {
    expect(service).toBeTruthy();
  }));
});
