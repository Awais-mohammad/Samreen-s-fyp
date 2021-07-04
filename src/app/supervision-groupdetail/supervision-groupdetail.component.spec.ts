import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionGroupdetailComponent } from './supervision-groupdetail.component';

describe('SupervisionGroupdetailComponent', () => {
  let component: SupervisionGroupdetailComponent;
  let fixture: ComponentFixture<SupervisionGroupdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisionGroupdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionGroupdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
