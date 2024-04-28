import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoShowComponent } from './contenido-show.component';

describe('ContenidoShowComponent', () => {
  let component: ContenidoShowComponent;
  let fixture: ComponentFixture<ContenidoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
