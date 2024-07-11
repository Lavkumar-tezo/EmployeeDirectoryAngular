import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../../core/models/role';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { EmployeeIdProfile } from '../../../core/models/employeeIdProfile';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [NgIf,RouterLink,RouterModule],
  templateUrl: './role-card.component.html',
  styleUrl: './role-card.component.css'
})
export class RoleCardComponent implements OnInit {
  @Input('roledata') roledata:Role;
  employeeList:EmployeeIdProfile[]=[];
  constructor(private employeeService:EmployeeService,private notification:NotificationService,private route:Router){

  }

  ngOnInit(): void {
    this.employeeService.getEmployeeProfileByRole(this.roledata.id).subscribe((res)=>{
      this.employeeList=res;
    })
  }

  openEditForm(){
    if(this.employeeList.length==0){
      this.route.navigate([`/home/roles/roleform/${this.roledata.id}`]);
    }
    else{
      this.notification.changeMessage("Have employee, can't edit",true);
    }
  }
}
