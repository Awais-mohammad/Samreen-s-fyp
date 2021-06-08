import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProposalComponent } from './student-proposal.component';

describe('StudentProposalComponent', () => {
  let component: StudentProposalComponent;
  let fixture: ComponentFixture<StudentProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
