import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleService } from '../../../core/services/role/role.service';
import { GeneralModel } from '../../../core/models/generalModel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department/department.service';
import { LocationService } from '../../../core/services/location/location.service';
import { NgFor,Location, NgIf, CommonModule } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Role } from '../../../core/models/role';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [NgFor,FormsModule,ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent implements OnInit, OnDestroy{
  formTitle:string='';
  roleId:string='';
  isEditMode:boolean=false;
  departments: GeneralModel[] = [];
  locations: GeneralModel[] = [];
  params:Subscription;
  roleForm: FormGroup;
  constructor(private locationRoute:Location,private route: ActivatedRoute,private roleService:RoleService,private departmentService:DepartmentService,private locationService:LocationService){
    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z\\s]+$')]),
      departmentIds: new FormControl([], Validators.required),
      locationIds: new FormControl([], Validators.required),
      description:new FormControl('')
    });
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((res)=>{
      this.departments=res;
    });
    this.locationService.getLocations().subscribe((res)=>{
      this.locations=res;
    });
    this.checkEditMode();
  }

  ngOnDestroy(){
    this.params.unsubscribe();
    this.roleId='';
  }

  checkEditMode(): void {
    this.params=this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.formTitle="Edit Role"
        this.roleId = params.get('id');
        this.isEditMode = true;
        this.roleService.getRoleById(this.roleId).subscribe((res)=>{
            this.populateForm(res);
        }); 
      }
      else{
        this.formTitle="Create New Role"
      }
    });
  }

  populateForm(role:Role): void {
    this.roleForm.patchValue({
      name: role.name,
      locationIds:role.locationIds,
      departmentIds:role.departmentIds,
      description:role.description
    });
   
  }

  onSubmit(): void {
    let formData = this.roleForm.value as Role;
      if (this.isEditMode) {
        formData.id=this.roleId;       
        this.roleService.editRole(formData).subscribe();
      } else {
        formData.id='';
        this.roleService.addRole(formData).subscribe();
      }
      this.onReset();
  }

  onReset(){
    this.locationRoute.back();
  }
}
