import { Component, Input } from '@angular/core';
import * as XLSX from "xlsx";
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [NgIf,RouterLink,RouterModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent {
  @Input() titleDesc;
  constructor(private employee:EmployeeService){
  }
  async exportArrayToExcel():Promise<void> {
    let sheetName="EmployeeData";
    var wb = XLSX.utils.book_new();
    // var ws = XLSX.utils.json_to_sheet(await this.employee.getEmployees());
    var ws;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  }
}
