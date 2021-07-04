import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationGroupdetailComponent } from './evaluation-groupdetail.component';

describe('EvaluationGroupdetailComponent', () => {
  let component: EvaluationGroupdetailComponent;
  let fixture: ComponentFixture<EvaluationGroupdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationGroupdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationGroupdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
