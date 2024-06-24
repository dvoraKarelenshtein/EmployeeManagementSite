import { Component, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Employee } from "../models/employee.model";
import { Observable,throwError, catchError, of, tap } from "rxjs";
// import { catchError } from "rxjs/operators";

// import { Observable, catchError, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

 
  constructor(private _http: HttpClient) { }

private baseUrl:string="https://localhost:7149/api"
  getAllEmployee(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.baseUrl}/Employees`)
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>(`${this.baseUrl}/Employees}`, employee);
  }


  updateEmployee(employee: Employee): Observable<boolean> {
    return this._http.put<boolean>(`${this.baseUrl}/Employees/${employee.id}`, employee)
  }

  deleteEmployee(employee: Employee): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/Employees/${employee.id}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.baseUrl}/Employees/}`);
  }
//----------------------------------------
  //  addRecipe(employee: Employee): Observable<boolean> {

  //   // קוד להוספת משתמש לשרת (בהתאם לשרת שבו אתה משתמש)
  //   // עדכון בשרת
  //  return this._http.post<boolean>("", employee)
  //   // this._recipesList.push(recipe); {

  //   // }
  // }
  // editRecipe(employee: Employee): Observable<boolean> {

  //   // קוד להוספת משתמש לשרת (בהתאם לשרת שבו אתה משתמש)
  //   // עדכון בשרת
  //  return this._http.put<boolean>(`http://localhost:5106/api/Recipe/${employee.recipeId}`, employee)
  //   // this._recipesList.push(recipe); {
  // //}
  // }
  // async deleteRecipe(employeeId: number): Promise<void> {
  //   const url = `http://localhost:5106/api/Recipe/${employeeId}`; // החלף בנקודת הקצה האמיתית של ה-API שלך

  //   // שלח בקשת DELETE לנקודת הקצה של ה-API
  //   try {
  //     await this._http.delete<void>(url)
  //       .pipe(
  //         tap(() => console.log("המתכון נמחק בהצלחה מהשרת.")),
  //         catchError((error) => {
  //           console.error("שגיאה במחיקת מתכון:", error.message);
  //           throw error; // חשוב להמשיך ולזרוק את השגיאה
  //         })
  //       )
  //       .toPromise();
  //   } catch (error) {
  //     // טפל בשגיאות שהתרחשו במהלך ביצוע ה-pipe או מחוץ ל-pipe
  //     console.error("שגיאה בלתי צפויה:", error);
  //   }
  // }

}

