import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaEditComponent } from './materia-edit.component';

describe('MateriaEditComponent', () => {
  let component: MateriaEditComponent;
  let fixture: ComponentFixture<MateriaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
