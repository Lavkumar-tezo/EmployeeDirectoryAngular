import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department/department.service';
import { LocationService } from '../../../core/services/location/location.service';
import { GeneralModel } from '../../../core/models/generalModel';
import { RoleService } from '../../../core/services/role/role.service';
import { SelectFilterComponent } from '../../../shared/components/select-filter/select-filter.component';

@Component({
  selector: 'app-role-filter',
  standalone: true,
  imports: [SelectFilterComponent],
  templateUrl: './role-filter.component.html',
  styleUrl: './role-filter.component.css'
})
export class RoleFilterComponent implements OnInit {
  departmentList:GeneralModel[]=[];
  locationList:GeneralModel[]=[];
  isDeptDefault:boolean=true;
  isLocationDefault:boolean=true;
  constructor(private departmentService:DepartmentService,
    private locationService:LocationService,private roleService:RoleService){
      
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((res)=>{
      this.departmentList=res;
    });
    this.locationService.getLocations().subscribe((res)=>{
      this.locationList=res;
    });
  }

  ngOnDestroy(): void {
    this.roleService.selectedDepartments.length=0;
    this.roleService.selectedLocations.length=0;
  }

  resetFilters() {
    this.isDeptDefault=true;
    this.isLocationDefault=true;
    this.roleService.selectedDepartments.length=0;
    this.roleService.selectedLocations.length=0;
    this.roleService.getSortedRoles();
  }

  onDeptFilterChange(values:string[]){
    this.roleService.selectedDepartments=values;
  }

  onLocationFilterChange(values:string[]){
    this.roleService.selectedLocations=values;
  }

  onFilterChange(name:string){
    if (name=="Department"){
      this.isDeptDefault=false;
    }
    else{
      this.isLocationDefault=false;
    }
  }

  applyFilters() {
    this.roleService.getSortedRoles();
  }
}
