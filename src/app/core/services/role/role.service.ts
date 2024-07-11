import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Role } from '../../models/role';
import { Observable, Subject, tap } from 'rxjs';
import { LocationService } from '../location/location.service';
import { DepartmentService } from '../department/department.service';
import { GeneralModel } from '../../models/generalModel';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  selectedDepartments: string[] = [];
  selectedLocations: string[] = [];
  private filterRoleChanged: Subject<Role[]> = new Subject<Role[]>();
  filterChanged: Observable<Role[]> = this.filterRoleChanged.asObservable();
  private roleSubject: Subject<void> = new Subject<void>();
  roleChanged: Observable<void> = this.roleSubject.asObservable();
  departmentList: GeneralModel[] = [];
  locationList: GeneralModel[] = [];
  constructor(private http: HttpClient, private locationService: LocationService, private departmentService: DepartmentService,private notification:NotificationService) { }

  getRoles() {
    return this.http.get<Role[]>(`${environment.URL}Role/GetRoles`);
  }

  getRoleByLocDept(locId: string, deptId: string) {
    let param = new HttpParams().set('locationId', locId).set('departmentId', deptId);
    return this.http.get<Role[]>(`${environment.URL}Role/GetRoleByDeptLoc`, {
      params: param
    })
  }

  getSortedRoles() {
    let sortedRoles: Role[] = [];
    this.departmentService.getDepartments().subscribe((res) => {
      this.departmentList = res;
      if (this.selectedDepartments.length != 0) {
        this.departmentList = this.departmentList.filter(dept => this.selectedDepartments.includes(dept.id))
      }
    })
    this.locationService.getLocations().subscribe((res) => {
      this.locationList = res;
      if (this.selectedLocations.length != 0) {
        this.locationList = this.locationList.filter(loc => this.selectedLocations.includes(loc.id))
      }
    })
    this.getRoles().subscribe((res) => {
      sortedRoles = res;
      sortedRoles = (this.selectedDepartments.length != 0) ?
        sortedRoles.filter(role => this.departmentList.some(input => role.departmentNames.includes(input.name))) : sortedRoles;
      sortedRoles = (this.selectedLocations.length != 0) ?
        sortedRoles.filter(role => this.locationList.some(input => role.locationNames.includes(input.name))) : sortedRoles;
      this.filterRoleChanged.next(sortedRoles);
    })
  }

  getRoleById(id:string){
    let param= new HttpParams().set('id',id);
    return this.http.get<Role>(`${environment.URL}Role/GetRole`,{
      params:param
    });
  }

  private assignValue(role:Role){
    role.departmentNames=[];
    role.locationNames=[];
    return role;
  }

  addRole(newRole:Role){
    newRole=this.assignValue(newRole);
    return this.http.post(`${environment.URL}Role/AddRole`,newRole,{
      responseType:'text'
    }).pipe(tap((res)=>{
      this.roleSubject.next();
      this.notification.changeMessage(res,false);
    }))
  }

  editRole(role:Role){
    role=this.assignValue(role);
    return this.http.put(`${environment.URL}Role/EditRole`,role,{
      responseType:'text'
    }).pipe(tap((res)=>{
      this.roleSubject.next();
      this.notification.changeMessage(res,false);
    }))
  }
}
