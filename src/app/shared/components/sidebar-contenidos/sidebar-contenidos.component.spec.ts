import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContenidosComponent } from './sidebar-contenidos.component';

describe('SidebarContenidosComponent', () => {
  let component: SidebarContenidosComponent;
  let fixture: ComponentFixture<SidebarContenidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContenidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
