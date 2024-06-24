import { Injectable } from "@angular/core";
import { EmployeeApiService } from "../services/employee-api.service";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { Employee } from "../models/employee.model";
import { error } from "console";

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  
  private employeeSubject = new BehaviorSubject<Employee[]>([]);
  employeeList$ = this.employeeSubject.asObservable();
  employeeListSource:Employee[] = [];

  constructor(private employeeApiService: EmployeeApiService) { 
    this.fetchEmployeeList()
  }

  fetchEmployeeList() {
    this.employeeApiService.getAllEmployee().subscribe(
      (result) => {
        this.employeeSubject.next(result);
        this.employeeListSource=result;
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    )
  }

  filterEmployess(search:string|null) {
    if(search===""||search===null)
    {
      this.employeeSubject.next(this.employeeListSource);
    }
    else{
      this.employeeSubject.next(this.employeeListSource.filter(e=>e.firstName.includes(search)));
    }
  }


  updateEmployee(employee: Employee) {
    this.employeeApiService.updateEmployee(employee).subscribe(
      (result) => {
        this.fetchEmployeeList();
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    );
  }

  removeEmployee(employee: Employee): Observable<void> {
    return this.employeeApiService.deleteEmployee(employee).pipe(
      tap(() => {
        this.fetchEmployeeList();
      }),
      catchError((error) => {
        console.error('Error deleting employee', error);
        return throwError(error);
      })
    );
  }
  
  // removeEmployee(id: number) {
  //   this.employeeApiService.deleteEmployee(id).subscribe(
  //     (result) => {
  //       this.fetchEmployeeList();
  //     },
  //     (error) => {
  //       console.error('Error updating employee', error);
  //     }
  //   );
  // }
  getAllEmployee(): Observable<Employee[]> {
    return this.employeeApiService.getAllEmployee();
  }
  
  addEmployee(employee: Employee) {
    this.employeeApiService.addEmployee(employee).subscribe(
      (result) => {
        this.fetchEmployeeList();
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    );
  }
}