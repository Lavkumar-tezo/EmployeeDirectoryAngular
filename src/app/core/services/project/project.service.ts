import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { GeneralModel } from '../../models/generalModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects:string[]=['Task -1','Task-2','Task -3','Task-4','Task -5']
  constructor(private http:HttpClient) { }

  getProjects(){
   return this.http.get<GeneralModel[]>(`${environment.URL}Project/GetProjects`)
  }
}
