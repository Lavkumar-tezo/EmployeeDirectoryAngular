import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../shared/components/page-title/page-title.component';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Employee } from '../../../core/models/employee';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LocationService } from '../../../core/services/location/location.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { GeneralModel } from '../../../core/models/generalModel';
import { Role } from '../../../core/models/role';
import { RoleService } from '../../../core/services/role/role.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [PageTitleComponent,EmployeeFilterComponent,EmployeeTableComponent,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeePageDesc={
    title1:'Employee',
    title2:'',
    desc:'Find all of your company\'s employee accounts and their associateroles',
    btn1:'Add Employee',
    btn2:'Export',
    route:'employeeform'
  }
  subscription1:Subscription;
  subscription2:Subscription;
  employeeList:Employee[]=[];
  private departmentList:GeneralModel[]=[];
  private locationList:GeneralModel[]=[];
  private roleList:Role[]=[];
  constructor(private employeeService:EmployeeService,private locationService:LocationService,private departmentService:DepartmentService,
    private roleService:RoleService
  ){
    this.departmentService.getDepartments().subscribe((res)=>{
      this.departmentList=res;
    })
    this.locationService.getLocations().subscribe((res)=>{
      this.locationList=res;
    })
    this.roleService.getRoles().subscribe((res)=>{
      this.roleList=res;
    })
  }

  ngOnInit(): void {
    this.fetchEmployee();
    this.subscription1=this.employeeService.filterChanged.subscribe((res)=>{
      this.employeeList=res;
    })
    this.subscription2=this.employeeService.employeeChanged.subscribe((res)=>{
      this.fetchEmployee();
    })
  }

  fetchEmployee(){
    this.employeeService.getEmployees().subscribe((res)=>{
      this.employeeList=res;
    });
  }
}
