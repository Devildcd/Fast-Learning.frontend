import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaCreateComponent } from './materia-create.component';

describe('MateriaCreateComponent', () => {
  let component: MateriaCreateComponent;
  let fixture: ComponentFixture<MateriaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
