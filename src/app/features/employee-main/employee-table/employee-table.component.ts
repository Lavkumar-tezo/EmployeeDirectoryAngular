import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Employee } from '../../../core/models/employee';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgIf,NgStyle,NgClass,RouterLink,NgFor,CommonModule,DatePipe],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  @Input('employeeList') employeeList: Employee[] = [];
  selctedRowCount: number = 0;
  selectedIds: Set<string> = new Set<string>();
  isRowDelete: boolean = false;
  deleteRowId: string | null = null;
  isHeaderChecked:boolean=false;
  employeeIdWithOptions: string | null = null;
  currentSortedColumn:string='';
  isAscending:boolean=false;
  // subscription1:Subscription;
  // subscription2:Subscription;
  constructor(private employeeService: EmployeeService, private el: ElementRef) {}

  ngOnInit() {
    // this.fetchEmployee();
    // this.subscription1=this.employeeService.filterChanged.subscribe((res)=>{
    //   this.employeeList=res;
    // })
    // this.subscription2=this.employeeService.employeeChanged.subscribe((res)=>{
    //   this.fetchEmployee();
    // })
    this.selctedRowCount = this.selectedIds.size;
  }

  // fetchEmployee(){
  //   this.employeeService.getEmployees().subscribe((res)=>{
  //     this.employeeList=res;
  //   });
  // }

  onSelectRow(id:string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
    this.selctedRowCount = this.selectedIds.size;
    this.isHeaderChecked=(this.selctedRowCount === this.employeeList.length);
  }

  onAllRowSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selctedRowCount = this.employeeList.length;
      this.selectedIds = new Set(this.employeeList.map(emp => emp.id));
    } else {
      this.selctedRowCount = 0;
      this.selectedIds.clear();
    }
  }

  toggleStatus(id:string){
    this.employeeService.changeEmployeeStatus(id).subscribe();
  }

  showDeleteDialogBox(id: string | null = null) {
    this.isRowDelete = true;
    this.deleteRowId = id;
  }

  hideDeleteDialogBox() {
    this.isRowDelete = false;
    this.deleteRowId = null;
  }

  get selectedRowCountText() {
    return this.deleteRowId ? 'this row' : `${this.selctedRowCount} row(s)`;
  }

  deleteEmployee() {
    if (this.deleteRowId) {
      let ids:string[]= new Array(1);
      ids.push(this.deleteRowId);
       this.employeeService.deleteEmployees(ids).subscribe();
        this.selectedIds.delete(this.deleteRowId);
    } else {
     this.employeeService.deleteEmployees(Array.from(this.selectedIds)).subscribe();
      this.selectedIds.clear();
    }
    this.isRowDelete = false;
    this.deleteRowId = null;
    this.selctedRowCount = 0;
  }

  toggleEditOption(event: Event, employeeId: string) {
    event.stopPropagation();
    this.employeeIdWithOptions = this.employeeIdWithOptions === employeeId ? null : employeeId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.employeeIdWithOptions = null;
  }

  sortTable(columnName:string){
    if(this.currentSortedColumn==null){
      this.isAscending=true;
    }
    else if(this.currentSortedColumn==columnName){
      this.isAscending=false;
    }
    else{
      this.isAscending=true;
    }
    this.currentSortedColumn=columnName;
    if(this.isAscending){
      this.employeeList=this.employeeList.sort((a,b)=> ((a as Employee)[columnName] > (b as Employee)[columnName] ? 1:-1))
    }
    else{
      this.employeeList=this.employeeList.sort((a,b)=> ((a as Employee)[columnName] < (b as Employee)[columnName] ? 1:-1))
    }
  }
}
