import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { GeneralModel } from '../../models/generalModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
  private depratments:string[]=['Product Eng','QA','UI/UX']

  getDepartments(){
    return this.http.get<GeneralModel[]>(`${environment.URL}Department/GetDepartments`)
  }
}
