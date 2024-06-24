import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
  
})
export class EmployeeComponent implements OnInit {
  @Input() public employee!: Employee

  employees: Employee[] = [];
// employee: any;

constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.fetchEmployees();

  }
  fetchEmployees(): void {
    // קבלת נתונים מהשרת או יצירת נתונים מקומיים
    // לדוגמה:
      // { id:1,firstName: 'John', lastName: 'sher', tz: '01234567',startDate: new Date('2017-04-02'),dateOfBirth: new Date('2017-04-02'),gender: 1 },
      // {id:2,firstName: 'Jane', lastName: 'Doe', tz: '987654321' ,startDate: new Date('2007-01-02'),dateOfBirth: new Date('2017-04-02'),gender: 0}
    
  }
}
