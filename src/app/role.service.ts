import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Role } from "./models/role.model";
import { Observable, throwError, catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 
  constructor(private _http: HttpClient) { }

  getAllRoles(): Observable<Role[]> {
    return this._http.get<Role[]>("https://localhost:7149/api/Roles");
  }

  addRole(role: Role): Observable<Role> {
    return this._http.post<Role>("https://localhost:7149/api/Roles", role);
  }

  updateRole(role: Role): Observable<boolean> {
    const url = `${"https://localhost:7014/Roles"}/${role.id}`;

    return this._http.put<boolean>(url, role)
      .pipe(
        catchError(error => {
          console.error('Error updating role:', error);
          return throwError(error);
        })
      );
  }

  deleteRole(role: Role): Observable<void> {
    const url = `${"https://localhost:7014/Roles"}/${role.id}`;

    return this._http.delete<void>(url)
      .pipe(
        catchError(error => {
          console.error('Error deleting role:', error);
          return throwError(error);
        })
      );
  }
}
