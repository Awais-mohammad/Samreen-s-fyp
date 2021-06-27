import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionGroupsComponent } from './supervision-groups.component';

describe('SupervisionGroupsComponent', () => {
  let component: SupervisionGroupsComponent;
  let fixture: ComponentFixture<SupervisionGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisionGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
