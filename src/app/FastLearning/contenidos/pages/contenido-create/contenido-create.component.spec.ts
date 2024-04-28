import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoCreateComponent } from './contenido-create.component';

describe('ContenidoCreateComponent', () => {
  let component: ContenidoCreateComponent;
  let fixture: ComponentFixture<ContenidoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
