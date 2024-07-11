import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { NgFor, NgIf } from '@angular/common';
import { PageTitleComponent } from '../../../shared/components/page-title/page-title.component';
import { Employee } from '../../../core/models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { LocationService } from '../../../core/services/location/location.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { Subscription } from 'rxjs';
import { GeneralModel } from '../../../core/models/generalModel';
import { Role } from '../../../core/models/role';

@Component({
  selector: 'app-role-detail',
  standalone: true,
  imports: [EmployeeCardComponent,NgFor,PageTitleComponent,NgIf],
  templateUrl: './role-detail.component.html',
  styleUrl: './role-detail.component.css'
})
export class RoleDetailComponent implements OnInit,OnDestroy {
  roleDetailsPageDesc={
    title1:'Role',
    title2:'Employee',
    desc:'Find all of your company\'s roles',
    btn1:'Add employee',
    route:'/home/employees/employeeform'
  };
  employeeList:Employee[]=[];
  roleId:string='';
  params:Subscription;
  constructor(private route: ActivatedRoute,private employeeService:EmployeeService){
  }

  ngOnInit(): void {
    this.params=this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.roleId = params.get('id');
        this.fetchData();
      }
    });
  }
  
  ngOnDestroy(){
    this.params.unsubscribe();
    this.roleId='';
  }

  fetchData(){
    this.employeeService.getEmployeeByRoleId(this.roleId).subscribe((res)=>{
      this.employeeList=res;
    });
  }
}
