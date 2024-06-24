// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-edit-employee',
//   standalone: true,
//   imports: [],
//   templateUrl: './edit-employee.component.html',
//   styleUrl: './edit-employee.component.scss'
// })
// export class EditEmployeeComponent {

// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeDataService } from '../store/employee-data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee } from '../models/employee.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'; // נוסיף את FormsModule ליבוא

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  constructor(private employeeDataService: EmployeeDataService, public dialog: MatDialog, private _router: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: Employee) {

  }

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(0,[]),
    firstName: new FormControl("",[]),
    lastName: new FormControl("",[]),
    tz: new FormControl([]),
    firstWork: new FormControl([]),
    dateOfBirth: new FormControl([]),
    gender: new FormControl<number>(0, []),
    statusEmployee: new FormControl<number>(1, []),
    roles: new FormArray([])
  });

  get jobForEmployee(): FormArray {
    return this.employeeForm.get('roles') as FormArray;
  }


  addjobForEmployee(): void {
    this.jobForEmployee.push(new FormGroup({
      jobName: new FormControl("", []),
      isManagement: new FormControl<boolean>(true, []),
      entryDate: new FormControl(new Date(), [])
    }));
  }

  removejobForEmployee(index: number): void {
    this.jobForEmployee.removeAt(index);
  }


  ngOnInit(): void {
    debugger
    this.employeeForm.patchValue(this.data)
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      alert("not valod form");
    }
    this.employeeForm.get("gender")?.setValue(Number(this.employeeForm.get("gender")?.value));
    this.employeeDataService.updateEmployee(this.employeeForm.value);
    this.dialog.closeAll()
  }


  // this.employeeService.(this.employeeForm.value).subscribe({
  //   next: () => {

  //     // this.sweetAlertService.fire({
  //     //   title: 'המתכון נוסף בהצלחה!',
  //     //   icon: 'success',
  //     // }).then(() => {
  //     //   // ניווט לדף all recipes
  //     // });
  //   },
  //   error: (error: any) => {
  //     console.error('שגיאה בהוספת מתכון:', error);
  //   },
  // });

}
