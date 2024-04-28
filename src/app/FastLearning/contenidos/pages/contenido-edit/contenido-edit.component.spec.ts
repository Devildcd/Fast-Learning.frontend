import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoEditComponent } from './contenido-edit.component';

describe('ContenidoEditComponent', () => {
  let component: ContenidoEditComponent;
  let fixture: ComponentFixture<ContenidoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
