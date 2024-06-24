import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatCardModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {
  
  // roleForm: FormGroup = new FormGroup({
  //   id: new FormControl("", [Validators.required]),
  //   roleName: new FormControl("", [Validators.required]),

  // });
  roleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.formBuilder.group({
      id: [0, Validators.required],
      roleName: ['', Validators.required],
      isManagement: [false, Validators.required]

    });
  }


  onSubmit(): void {
    if (this.roleForm.invalid) {
      return;
    }
  }
  // const roleName: string = this.roleForm.value.roleName;
  // const isConfirmed: boolean = confirm('האם ברצונך לקחת את התפקיד כתפקיד ניהולי?');
  // const isManagementRole: boolean = isConfirmed ? true : false;
  // const roleData: Role = {
  //   roleName: roleName,
  //   isManagement: isManagementRole,
  //   id: undefined,

  // };


  // if (isConfirmed) {
  //   const roleData: Role = {
  //     roleName: roleName,

  //     id: undefined // אם ה-id של התפקיד מיועד להיות אוטומטי בשרת, נגדיר אותו כ-undefined
  //   };
  // addRole(): void {
  //   this.roleService.addRole(this.roleForm)
  // }
  // this.roleService.addRole(this.roleForm).subscribe((addedRole: Role) => {
  //   // כאן נוסיף את התפקיד לרשימת התפקידים של האדם הנוכחי
  //   // ונסמן אם זהו תפקיד ניהולי או לא
  // });

  // this.roleService?.addRole(this.roleForm.value).subscribe({
  //   next: () => {
  //     console.log('Employee added successfully');
  //     // Additional logic after adding an employee
  //   },
  //   error: (error) => {
  //     console.error('Error adding employee:', error);
  //   },
  // });
}
// isManagementRole(roleName: string): boolean {
//   // כאן אתה יכול להוסיף תנאים לזיהוי של תפקיד ניהולי בהתאם לדרישות המערכת שלך
//   // לדוגמה, נניח שתפקיד ניהולי הוא תפקיד שמתחיל במילת "מנהל" או "ראש"
//   return roleName.startsWith("מנהל") || roleName.startsWith("ראש");
// }
