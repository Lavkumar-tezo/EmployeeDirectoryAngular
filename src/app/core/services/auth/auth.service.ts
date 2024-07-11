import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, of, tap } from 'rxjs';


export interface LoginResponse {
  token: string;
  isManager: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private tokenKey = 'emp-token';

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    let body={
      Email:email,
      Password:password
    }
    return this.http.post<LoginResponse>(`${environment.URL}Login`,body).pipe(
      tap(res => {
        sessionStorage.setItem(this.tokenKey, res.token);
        this.isLoggedIn=true;
      }),
      catchError((err) => {
        sessionStorage.removeItem(this.tokenKey);
        this.isLoggedIn=false;
        return of(''); 
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
