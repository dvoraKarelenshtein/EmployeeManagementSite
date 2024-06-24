import { Role } from "./role.model";

export class Employee {
  id!:number;
  firstName!:string;
  lastName!:string;
  tz!:string;
  firstWork!:Date;
  dateOfBirth!:Date;
  gender!:number;
  statusEmployee!:number;
  roles!:Role[];
}


