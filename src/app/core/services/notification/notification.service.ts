import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject= new Subject<void>();
  notificationChanged:Observable<void>=this.notificationSubject.asObservable();
  message:string='';
  isError:boolean;
  constructor() { }

  changeMessage(message:string,isError:boolean){
    this.message=message;
    this.isError=isError;
    this.notificationSubject.next();
  }
}
