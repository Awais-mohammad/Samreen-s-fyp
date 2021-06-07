import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuerriesComponent } from './student-querries.component';

describe('StudentQuerriesComponent', () => {
  let component: StudentQuerriesComponent;
  let fixture: ComponentFixture<StudentQuerriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuerriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuerriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
