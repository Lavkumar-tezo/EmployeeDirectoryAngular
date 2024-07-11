import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { NgFor } from '@angular/common';
import { DepartmentService } from '../../../core/services/department/department.service';
import { LocationService } from '../../../core/services/location/location.service';
import { SelectFilterComponent } from '../../../shared/components/select-filter/select-filter.component';
import { GeneralModel } from '../../../core/models/generalModel';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [NgFor,SelectFilterComponent],
  templateUrl: './employee-filter.component.html',
  styleUrl: './employee-filter.component.css'
})
export class EmployeeFilterComponent implements OnInit,OnChanges,OnDestroy{
  alphabet: string[] = [];
  selectedAlphabet: string = '';
  isStatusDefault:boolean=true;
  isDeptDefault:boolean=true;
  isLocationDefault:boolean=true;
  departmentList:GeneralModel[]=[];
  locationList:GeneralModel[]=[];
  statusList:GeneralModel[]=[
    {
    id:'active',
    name:'Active'
    },
    {
      id:'inactive',
      name:'Inactive'
    }
];
  constructor(private departments:DepartmentService,
    private locations:LocationService,private employeeService:EmployeeService) { }

  ngOnInit() {
    for (let i = 65; i <= 90; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
    this.departments.getDepartments().subscribe((res)=>{
      this.departmentList=res;
    });
    this.locations.getLocations().subscribe((res)=>{
      this.locationList=res;
    });
  }

  ngOnChanges(): void {
    this.selectedAlphabet=this.employeeService.selectedAlpha;
  }

  ngOnDestroy(): void {
    this.employeeService.selectedAlpha='';
    this.employeeService.selectedDepartments.length=0;
    this.employeeService.selectedLocations.length=0;
    this.employeeService.selectedStatus.length=0;
  }

  onAlphabeticSelect(alpha: string) {
    if (alpha === this.selectedAlphabet) {
      this.selectedAlphabet = '';
    } else {
      this.selectedAlphabet = alpha;
    }
    this.employeeService.selectedAlpha = this.selectedAlphabet;
    this.employeeService.getSortedEmployees();
  }

  resetFilters() {
    this.selectedAlphabet='';
    this.isDeptDefault=true;
    this.isStatusDefault=true;
    this.isLocationDefault=true;
    this.employeeService.selectedAlpha='';
    this.employeeService.selectedDepartments.length=0;
    this.employeeService.selectedLocations.length=0;
    this.employeeService.selectedStatus.length=0;
    this.employeeService.getSortedEmployees();
  }

  onStatusFilterChange(values:string[]){
    this.employeeService.selectedStatus=values;
  }

  onDeptFilterChange(values:string[]){
    this.employeeService.selectedDepartments=values;
  }

  onLocationFilterChange(values:string[]){
    this.employeeService.selectedLocations=values;
  }

  onFilterChange(name:string){
    if(name=="status"){
      this.isStatusDefault=false;
    }
    else if (name=="Department"){
      this.isDeptDefault=false;
    }
    else{
      this.isLocationDefault=false;
    }
  }
  
  applyFilters() {
    this.employeeService.getSortedEmployees();
  }
}
