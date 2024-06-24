import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../models/employee.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   // Add more data here...
// ];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,
     MatButtonModule, MatDividerModule, MatIconModule,MatFormFieldModule,
     MatInputModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',

})

@Injectable({
  providedIn: 'root'
})
export class TableComponent implements OnInit {
  // items: string[] = ['איבר ראשון', 'איבר שני', 'איבר שלישי'];
  isDarkTheme: boolean = true;

  employees: Employee[] | undefined; // מקבל נתונים זמניים מהאפליקציה או משירות
  selectedEmployee: Employee | null = null; // משתנה לאחסון העובד שנבחר
  searchControl = new FormControl('');
  filteredEmployees: Employee[] = [];
  // searchTerm: any;
  tableBackgroundColor: string = '#fff';
  tableTextColor: string = '#333';
  tableHeaderBackgroundColor: string = '#f2f2f2';
  // dataSource: any;
  dataSource: any[] = []; // כאן יהיו הנתונים שלך
  // filteredEmployees: any[] = [];
  searchTerm: string = '';

  constructor(private recipeForm: FormGroup, private _router: ActivatedRoute, private http: HttpClient) {

    const defaultStartDate = new Date();
    this.recipeForm = new FormGroup({
      // id: new FormControl(1, [Validators.required]),
      id: new FormControl(1, [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      tz: new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      startDate: new FormControl(defaultStartDate, [Validators.required]),
      // dateOfBirth: new FormControl(Date, [Validators.required]),
      // gender: new FormControl(0, [Validators.required])
      // instructions: new FormArray([], [Validators.required]),

    });
  }
  // tempemployees: Employee[] = []
  //   { id: 1, firstName: 'גיל', lastName: 'דומב', tz: '01234567', startDate: new Date('2007-02-01') },
  //   { id: 2, firstName: 'Jane', lastName: 'Doe', tz: '987654321', startDate: new Date('2008-03-15') },
  //   // נוסיף כאן עובדים נוספים אם רצוי
  // ];



  ngOnInit(): void {
 
    this._router.params.subscribe((param) => {
     
      this.searchControl.valueChanges.subscribe((searchTerm) => {
        if (typeof searchTerm === 'string' || typeof searchTerm === 'number') {
          this.filterData(searchTerm);
        }
      });
    });



  }
  applyFilter(): void {
    if (!this.searchTerm.trim() || this.searchTerm.trim() === '') {
      this.filteredEmployees = this.dataSource ? [...this.dataSource] : [];
      return;
    }

    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.dataSource?.filter(employee =>
      (employee.firstName?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (employee.lastName?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (employee.tz?.includes(this.searchTerm) || false)
    ) || [];
  }

  filterData(searchTerm: string): void {
    if (!searchTerm.trim() || searchTerm.trim() === '') {
      this.filteredEmployees = this.employees ? [...this.employees] : [];
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.filteredEmployees = this.employees?.filter(employee =>
      (employee.firstName?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (employee.lastName?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (employee.tz?.includes(searchTerm) || false)
    ) || [];
  }

  // פונקציה שמשנה את ערכת הצבעים
  changeTableColors(): void {
    // שינוי הערך של isDarkTheme לערך ההפוך שלו
    this.isDarkTheme = !this.isDarkTheme;

    // עדכון הצבעים על פי הערך החדש של isDarkTheme
    if (this.isDarkTheme) {
      // אם זה ערך כהה, שנה צבעים כאן
      const tableBackgroundColor = '#339';
      const tableTextColor = '#fff';
      const tableHeaderBackgroundColor = '#333';
      // וכן הלאה
    } else {
      // אם זה לא ערך כהה, שנה צבעים כאן
      const tableBackgroundColor = '#fff';
      const tableTextColor = '#333';
      const tableHeaderBackgroundColor = '#f2f2f2';
      // וכן הלאה
    }
  }


  // קוד נוסף שלך...

  onSelectEmployee(employee: Employee) {
    this.selectedEmployee = employee; // עדכון העובד שנבחר
  }
  closeCard() {
    this.selectedEmployee = null;
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      return;
    }



    // this.employeeService.editRecipe(this.recipeForm.value).subscribe({
    //   next: () => {

    //     // this.sweetAlertService.fire({
    //     //   title: 'המתכון נוסף בהצלחה!',
    //     //   icon: 'success',
    //     // }).then(() => {
    //     //   // ניווט לדף all recipes
    //     // });
    //   },
    //   error: (error) => {
    //     console.error('שגיאה בהוספת מתכון:', error);
    //   },
    // });
  }


  //   onClickAddEmployee(employee:Employee) {
  //   this.employeeService.addEmployee(employee)  
  //     // ניתן להוסיף כאן לוגיקה נוספת אם רצוי, כגון ניווט לעמוד הוספת עובד חדש
  //     alert("הוספת עובד חדש");
  // }


  onClickAdd() {

    alert("הודעת התראה כלשהי");
  }
  deleteEmployee(employee: Employee) {
    if(confirm("Are you sure you want to delete this employee?")) {
        employee.statusEmployee=0;
        alert("Employee has been deleted.");
    }
}
    deleteEE() {
      // if (confirm('Are you sure you want to delete this recipe?')) {
      //     this.employeeService.deleteEmployee(this.recipeForm!.id).then(() => {
      //         // הצג הודעה שהמתכון נמחק בהצלחה
      //         alert("המתכון נמחק בהצלחה!");
      //         this._router.navigate(['/allRecipes']);
      //         // הסר את המתכון מהרשימה
      //         this.recipes = this.recipes.filter(recipe => recipe.RecipeId !== this.recipe!.RecipeId);
      //     }, error => {
      //         // אם המחיקה נכשלה, נציג הודעת שגיאה
      //         console.error('Failed to delete recipe:', error);
      //         alert('Failed to delete recipe. Please try again later.');
      //       });
      // }
  }

  // deleteEmployee(employee: Employee) {
  //   this.employeeService.deleteEmployee(employee);
  // }
  editEmployee(employee: Employee) {

  }



}
