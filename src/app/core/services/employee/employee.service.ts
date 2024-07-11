import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Employee } from '../../models/employee';
import { NotificationService } from '../notification/notification.service';
import { LocationService } from '../location/location.service';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';
import { GeneralModel } from '../../models/generalModel';
import { Role } from '../../models/role';
import { EmployeeIdProfile } from '../../models/employeeIdProfile';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedAlpha: string;
  selectedDepartments: string[] = [];
  selectedStatus: string[] = [];
  selectedLocations: string[] = [];
  private employeeSubject: Subject<void> = new Subject<void>();
  employeeChanged: Observable<void> = this.employeeSubject.asObservable();
  private filterEmployeeSubject: Subject<Employee[]> = new Subject<
    Employee[]
  >();
  private departmentList:GeneralModel[]=[];
  private locationList:GeneralModel[]=[];
  private roleList:Role[]=[];
  filterChanged: Observable<Employee[]> =
    this.filterEmployeeSubject.asObservable();

  constructor(
    private http: HttpClient,
    private notification: NotificationService,private locationService:LocationService,private departmentService:DepartmentService,
    private roleService:RoleService
  ) {}

  getEmployees() {
    return this.http.get<Employee[]>(`${environment.URL}Employee/GetEmployees`);
  }

  getEmployeeById(id: string) {
    let param = new HttpParams().set('id', id);
    return this.http.get<Employee>(`${environment.URL}Employee/GetEmployee`, {
      params: param,
    });
  }

  getEmployeeByRoleId(id:string){
    let param = new HttpParams().set('id', id);
    return this.http.get<Employee[]>(`${environment.URL}Employee/GetEmployeesByRoleId`, {
      params: param,
    });
  }

  getMangers() {
    return this.http.get<Employee[]>(`${environment.URL}Employee/GetManagers`);
  }

  getSortedEmployees() {
    let sortedEmployee: Employee[];
    this.departmentService.getDepartments().subscribe((res)=>{
      this.departmentList=res;
    })
    this.locationService.getLocations().subscribe((res)=>{
      this.locationList=res;
    })
    this.roleService.getRoles().subscribe((res)=>{
      this.roleList=res;
    })
    this.getEmployees().subscribe((res) => {
      sortedEmployee = res;
      sortedEmployee = this.selectedAlpha
        ? sortedEmployee.filter((emp) =>
            emp.firstName
              .toLowerCase()
              .startsWith(this.selectedAlpha.toLowerCase())
          )
        : sortedEmployee;
      sortedEmployee =
        this.selectedDepartments.length != 0
          ? sortedEmployee.filter((emp) =>
              this.selectedDepartments.includes(emp.departmentId.toUpperCase())
            )
          : sortedEmployee;
      sortedEmployee =
        this.selectedLocations.length != 0
          ? sortedEmployee.filter((emp) =>
              this.selectedLocations.includes(emp.locationId.toUpperCase())
            )
          : sortedEmployee;
      sortedEmployee =
        this.selectedStatus.length != 0
          ? sortedEmployee.filter((emp) =>
              this.selectedStatus.includes(emp.status.toUpperCase())
            )
          : sortedEmployee;
      this.filterEmployeeSubject.next(sortedEmployee);
    });
  }

  getEmployeeProfileByRole(roleId:string){
    let param=new HttpParams().set('id',roleId);
    return this.http.get<EmployeeIdProfile[]>(`${environment.URL}Employee/GetEmployeesProfileByRoleId`,{
      params:param
    })
  }

  private assignValue(employee:Employee){
    employee.projectName='';
    employee.departmentName='';
    employee.roleName='';
    employee.locationName='';
    console.log(employee);
    return employee;
  }
  addEmployee(newEmployee: Employee) {
    newEmployee=this.assignValue(newEmployee);
    return this.http
      .post(`${environment.URL}Employee/Add`, newEmployee,{
        responseType:'text'
      })
      .pipe(
        tap((res) => {
          this.employeeSubject.next();
          this.notification.changeMessage(res, true);
        })
      );
  }

  updateEmployee(employee: Employee) {
    employee=this.assignValue(employee);
    return this.http
      .put(`${environment.URL}Employee/Update`, employee,{
        responseType:'text'
      })
      .pipe(
        tap((res) => {
          this.employeeSubject.next();
          this.notification.changeMessage(res, true);
        })
      );
  }

  changeEmployeeStatus(id: string) {
    let param=new HttpParams().set('id',id);
    return this.http
      .put(`${environment.URL}Employee/UpdateStatus`, null,{
        responseType:"text",
        params:param
      })
      .pipe(
        tap((res) => {
          this.employeeSubject.next();
          this.notification.changeMessage(res, false);
        })
      );
  }

  deleteEmployees(ids: string[]) {
    let params = new HttpParams();
    ids.forEach((id) => {
      params = params.append('ids', id);
    });
    return this.http
      .delete(`${environment.URL}Employee/DeleteSelectedEmployee`, {
        responseType:'text',
        body:ids
      })
      .pipe(
        tap((res) => {
          this.employeeSubject.next();
          this.notification.changeMessage(res, true);
        })
      );
  }
}
