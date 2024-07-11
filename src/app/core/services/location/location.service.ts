import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { GeneralModel } from '../../models/generalModel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  private locations:string[]=['Bangalore','Hyderabad']

  getLocations(){
    return this.http.get<GeneralModel[]>(`${environment.URL}Location/GetLocations`)
  }
}
