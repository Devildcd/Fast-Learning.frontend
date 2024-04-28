import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosListComponent } from './contenidos-list.component';

describe('ContenidosListComponent', () => {
  let component: ContenidosListComponent;
  let fixture: ComponentFixture<ContenidosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
