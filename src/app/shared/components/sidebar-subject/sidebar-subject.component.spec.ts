import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSubjectComponent } from './sidebar-subject.component';

describe('SidebarSubjectComponent', () => {
  let component: SidebarSubjectComponent;
  let fixture: ComponentFixture<SidebarSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
