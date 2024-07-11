import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../shared/components/page-title/page-title.component';
import { RoleFilterComponent } from '../role-filter/role-filter.component';
import { Subscription } from 'rxjs';
import { RoleService } from '../../../core/services/role/role.service';
import { Role } from '../../../core/models/role';
import { RoleCardComponent } from '../role-card/role-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [PageTitleComponent,RoleFilterComponent,RoleCardComponent,NgFor,NgIf],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  rolePageDesc={
    title1:'Role',
    titl2:'',
    desc:'Find all of your company\'s roles',
    btn1:'Add role',
    route:'roleform'
  }
  subscription1:Subscription;
  subscription2:Subscription;
  roleList:Role[]=[];
  constructor(private roleService:RoleService){

  }
  ngOnInit(): void {
    this.fetchRole();
    this.subscription1=this.roleService.filterChanged.subscribe((res)=>{
      this.roleList=res;
    })
    this.subscription2=this.roleService.roleChanged.subscribe(()=>{
      this.fetchRole();
    })
  }

  fetchRole(){
    this.roleService.getRoles().subscribe((res)=>{
      this.roleList=res;
    });
  }
}
