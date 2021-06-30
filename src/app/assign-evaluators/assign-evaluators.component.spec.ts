import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEvaluatorsComponent } from './assign-evaluators.component';

describe('AssignEvaluatorsComponent', () => {
  let component: AssignEvaluatorsComponent;
  let fixture: ComponentFixture<AssignEvaluatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEvaluatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEvaluatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
