import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinatorDashboardComponent } from './cordinator-dashboard.component';

describe('CordinatorDashboardComponent', () => {
  let component: CordinatorDashboardComponent;
  let fixture: ComponentFixture<CordinatorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordinatorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CordinatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
