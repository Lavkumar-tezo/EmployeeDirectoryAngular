import { Component } from '@angular/core';
import {CommonModule, DatePipe, Location, NgFor, NgIf} from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../core/models/employee';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { LocationService } from '../../../core/services/location/location.service';
import { ProjectService } from '../../../core/services/project/project.service';
import { RoleService } from '../../../core/services/role/role.service';
import { Role } from '../../../core/models/role';
import { formatDate } from '@angular/common';
import { GeneralModel } from '../../../core/models/generalModel';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,FormsModule,NgIf,CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  formTitle:string;
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId: string = '';
  departments: GeneralModel[] = [];
  locations: GeneralModel[] = [];
  projects: GeneralModel[] = [];
  roles: Role[] = [];
  managers:Employee[]=[];
  params:Subscription;
  imagePreview: string |ArrayBuffer = 'assets/images/dummy-profile-image.jpg';
  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private projectService:ProjectService,
    private locationService:LocationService,
    private roleService:RoleService,
    private locationRoute:Location
  ) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      joiningDate: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
      departmentId: new FormControl('', Validators.required),
      locationId: new FormControl('', Validators.required),
      roleId: new FormControl({value:'',disabled:true}, Validators.required,),
      id: new FormControl('', [Validators.required,Validators.pattern(/^TZ\d{4}$/)]), // Assuming this is the unique identifier for employee
      dob: new FormControl(''),
      projectId: new FormControl(''),
      manager: new FormControl(''),
      status: new FormControl('Active'),
      mobile: new FormControl('', [Validators.pattern(/^\d{10}$/),Validators.maxLength(10),Validators.minLength(10)])
    });
    this.employeeForm.controls['roleId'].disable;
  }
  transformToUpperCase(controlName: string): void {
    const control = this.employeeForm.get(controlName);
    if (control) {
      control.setValue(control.value.toUpperCase());
    }
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe((res)=>{
      this.departments=res;
    });
    this.locationService.getLocations().subscribe((res)=>{
      this.locations=res;
    });
    this.roleService.getRoles().subscribe((res)=>{
      this.roles=res;
    });
    this.projectService.getProjects().subscribe((res)=>{
      this.projects=res;
    });
    this.employeeService.getMangers().subscribe((res)=>{
      this.managers=res;
    });
    this.checkEditMode();
  }

  ngOnDestroy(){
    this.params.unsubscribe();
    this.employeeId='';
  }
  

  checkEditMode(): void {
    this.params=this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.formTitle="Edit Employee"
        this.employeeId = params.get('id');
        this.isEditMode = true;
      this.employeeService.getEmployeeById(this.employeeId).subscribe((res)=>{
        this.populateForm(res);
      });
        
      }
      else{
        this.formTitle="Add Employee"
      }
    });
  }

  populateForm(employee:Employee): void {
    console.log(employee.joiningDate)
    this.employeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      joiningDate:this.convertDateTime(employee.joiningDate),
      departmentId: employee.departmentId,
      locationId: employee.locationId,
      roleId: employee.roleId,
      id: employee.id,
      dob:this.convertDateTime(employee.dob),
      projectId: employee.projectId,
      manager: employee.manager,
      status: employee.status,
      mobile: employee.mobile,
    });
    this.imagePreview=(employee.profile) ? employee.profile:'assets/images/dummy-profile-image.jpg';
  }

  convertDateTime(inputDateTime: string | null): string | null {
    if(inputDateTime==null){
      return null;
    }
    const dateTimeParts = inputDateTime.split(' ');
    if (dateTimeParts.length < 1) {
      return null;
    }
    const dateParts = dateTimeParts[0].split('/');
    if (dateParts.length !== 3) {
      return null;
    }
    const month = dateParts[0].padStart(2, '0');
    const day = dateParts[1].padStart(2, '0');
    const year = dateParts[2];
    const formattedDate = `${month}/${day}/${year}`;
    return this.datePipe.transform(formattedDate, 'yyyy-MM-dd');
  }
  

  
  onSubmit(): void {
    let formData = this.employeeForm.value as Employee;
    if(formData.dob){
      formData.dob=formatDate(formData.dob,'MM/dd/yyyy','en-US');
    }
    formData.joiningDate=formatDate(formData.joiningDate,'MM/dd/yyyy','en-US');
    formData.profile=this.imagePreview.toString();
      if (this.isEditMode) {       
        this.employeeService.updateEmployee(formData).subscribe();
      } else {    
        this.employeeService.addEmployee(formData).subscribe();
      }
      this.onReset();
  }

  onReset(){
    this.employeeForm.reset();
    this.locationRoute.back();
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.employeeForm.patchValue({ profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  locationDeptChnaged(){
    if(this.employeeForm.get('locationId').valid && this.employeeForm.get('departmentId').valid){
      this.roleService.getRoleByLocDept(this.employeeForm.get('locationId').value,this.employeeForm.get('departmentId').value).subscribe((res)=>{
        this.roles=res;
      })
      this.employeeForm.get('roleId')?.enable();
      this.employeeForm.patchValue({
        roleId:''
      })
    }
  }
}
