import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMateriasComponent } from './sidebar-materias.component';

describe('SidebarMateriasComponent', () => {
  let component: SidebarMateriasComponent;
  let fixture: ComponentFixture<SidebarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
