import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-table.component';

describe('EmployeeTableComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//לEmployeeListComponent ל EmployeeTableComponent שיניתי את כל ה