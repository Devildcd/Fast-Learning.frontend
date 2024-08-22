import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCursosComponent } from './sidebar-cursos.component';

describe('SidebarCursosComponent', () => {
  let component: SidebarCursosComponent;
  let fixture: ComponentFixture<SidebarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
