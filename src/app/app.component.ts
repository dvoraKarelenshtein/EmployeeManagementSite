import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from "./employee/employee.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { TableComponent } from "./table/table.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AddRoleComponent } from "./add-role/add-role.component";
import { FooterComponent } from "./footer/footer.component";
import { EmployeeListComponent } from "./employee-table/employee-table.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, EmployeeComponent, TopBarComponent, TableComponent,
        AddEmployeeComponent, AddRoleComponent, FooterComponent, EmployeeListComponent]
})
export class AppComponent {
  title = 'PracticumClientSide';
}
