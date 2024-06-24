import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormsModule } from '@angular/forms';
import { EmployeeDataService } from '../store/employee-data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
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
    status: new FormControl<boolean>(true, []),
    roles: new FormArray([])
  });
  get jobForEmployee(): FormArray {
    return this.employeeForm.get('roles') as FormArray;
  }

  addjobForEmployee(): void {
    this.jobForEmployee.push(new FormGroup({
      name: new FormControl("", []),
      isManagement: new FormControl<boolean>(true, []),
      entryDate: new FormControl(new Date(), [])
    }));
  }

  removejobForEmployee(index: number): void {
    this.jobForEmployee.removeAt(index);
  }
  ngOnInit(): void {
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
  //addEmployee to the server

  // this.employeeService?.addEmployee(this.employeeForm.value).subscribe({
  //   next: () => {
  //     console.log('Employee added successfully');
  //     // Additional logic after adding an employee
  //   },
  //   error: (error) => {
  //     console.error('Error adding employee:', error);
  //   },
  // });


  // employeeForm: FormGroup = new FormGroup({
  //   id: new FormControl("", [Validators.required]),
  //   firstName: new FormControl("", [Validators.required]),
  //   lastName: new FormControl("", [Validators.required]),
  //   // tz: new FormControl("", [Validators.required]),
  //   startDate: new FormControl("", [Validators.required]),
  //   // dateOfBirth: new FormControl("", [Validators.required]),
  //   // gender: new FormControl("", [Validators.required]),
  //   // You can add more fields as needed
  // });
  // private employeeService: EmployeeService | undefined;

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // onSubmit(): void {
  //   if (this.employeeForm.invalid) {
  //     return;
  //   }
    //addEmployee to the server
  


    // this.employeeService?.addEmployee(this.employeeForm.value).subscribe({
    //   next: () => {
    //     console.log('Employee added successfully');
    //     // Additional logic after adding an employee
    //   },
    //   error: (error) => {
    //     console.error('Error adding employee:', error);
    //   },
    // });
  }

