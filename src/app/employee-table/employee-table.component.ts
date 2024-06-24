
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeDataService } from '../store/employee-data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { saveAs } from 'file-saver';


@Component({

  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule,
    FormsModule, MatIconModule, MatDialogModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeListComponent implements OnInit {

  search = new FormControl("");
  employees: Employee[] = [];
  editedEmployee!: Employee
  filterValue: string | undefined;
  employeeList: Observable<Employee[]> = this.employeeDataService.employeeList$;

  constructor(private readonly employeeDataService: EmployeeDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.search.valueChanges.subscribe(value => {
      this.employeeDataService.filterEmployess(value)
    })
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeDataService.getAllEmployee().subscribe(employees => {
      this.employees = employees;
    });
  }
  openDialog(employee: Employee): void {
    this.dialog.open(EditEmployeeComponent, {
      data: employee,
      panelClass: "dialog"
    });
  }
  editEmployee(employee: Employee) {
    this.openDialog(employee);
  }

  cancelEdit() {
    // Cancelling employee edit

  }

  saveEmployeeChanges() {
    if (this.editedEmployee) {
      // Updating the employee on the server
      // this.employeeService.deleteEmployee(this.editedEmployee).subscribe(
      //   () => {
      //     // Updating the employee in the list
      //     const index = this.employees.findIndex(e => e.id === this.editedEmployee.id);
      //     if (index !== -1) {
      //       this.employees[index] = splice(index,1);
      //     }
      //     this.editedEmployee = new Employee(); // או// Finish editing
      //   },
      //   (error:any) => {
      //     console.log('Error updating employee:', error);
      //   }
      // );
    }
  }
  deleteEmployee(employee: Employee) {
    if (confirm("Are you sure you want to delet this employee?")) {
      // Changing the status of the employee
      employee.statusEmployee = 0;

      // Updating the employee on the server
      this.employeeDataService.removeEmployee(employee).subscribe();

      alert("Employee  has been delet.");
    }
  }
  //   deleteEmployee(employee: Employee) {
  //     if(confirm("Are you sure you want to change the status of this employee?")) {
  //         // Changing the status of the employee
  //         employee.status = false;

  //         // Updating the employee on the server
  //         this.employeeDataService.updateEmployee(employee).subscribe(
  //             () => {
  //                 alert("Employee status has been changed.");
  //             },
  //             (error: any) => {
  //                 console.error('Error updating employee status:', error);
  //             }
  //         );
  //     }
  // }
  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
  }
  // exportToExcel(employee: Employee) {
  //   // ליצור את הפונקציה exportToExcel המקבלת עובד כפרמטר
  //   const csvContent = `${employee.id},${employee.firstName},${employee.lastName},${employee.tz},${employee.firstWork}\n`;
  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  //   saveAs(blob, 'employee.csv'); // השתמש בפונקציה saveAs מספריה הנדרשת
  // }

  // exportToExcel(employee: Employee) {
  //   // ליצור את הפונקציה exportToExcel המקבלת עובד כפרמטר
  //   const csvContent = `${employee.id},${employee.firstName},${employee.lastName},${employee.tz},${employee.firstWork}\n`;
  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  //   saveAs(blob, 'employee.csv'); // השתמש בפונקציה saveAs מספריה הנדרשת
  // }
  exportToExcel = () => {
    const table = document.querySelector('table');
    if (table) {
      const rows = Array.from(table.querySelectorAll('tr'));
      const header = 'First Name,Last Name,TZ,Date of Birth \n';
      //     const csv = employees.map(e => `${e.id},${e.firstName},${e.lastName},${e.dateOfBirth}`).join('\n');
      // const header = Array.from(rows.shift()?.querySelectorAll('th') || []).map(th => th.innerText).join(',');
      const csv = rows.map(row => Array.from(row.querySelectorAll('td')).map(td => td.innerText).join(',')).join('\n');
      const blob = new Blob([header + '\n' + csv], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'employees.csv');
    } else {
      console.error('Table element not found.');
    }
  }

  //   exportToExcel = () => { 
  //     // Exporting the employees list to Excel
  //     const employees = this.employees;
  //     const header = 'ID,First Name,Last Name,Date of Birth \n';  
  //     const csv = employees.map(e => `${e.id},${e.firstName},${e.lastName},${e.dateOfBirth}`).join('\n');
  //     const blob = new Blob([header + csv], { type: 'text/csv' });
  //     saveAs(blob, 'employees.csv');


  // }
}
function splice(index: number, arg1: number): Employee {
  throw new Error('Function not implemented.');
}

