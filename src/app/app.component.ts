import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageLayoutService } from './core/services/page-layout/page-layout.service';
import { PageLayout } from './core/enums/Page-layout';
import { AuthorizedLayoutComponent } from './layouts/authorized-layout/authorized-layout.component';
import { UnauthorizedLayoutComponent } from './layouts/unauthorized-layout/unauthorized-layout.component';
import { CommonModule, NgIf } from '@angular/common';
import { NotificationService } from './core/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { ErrorLayoutComponent } from './layouts/error-layout/error-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthorizedLayoutComponent, UnauthorizedLayoutComponent,ErrorLayoutComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'front-end';
  readonly PageLayout = PageLayout;
  subscription:Subscription;
  message:string='';
  isError:boolean
  constructor(public pageLayoutService: PageLayoutService,private notification:NotificationService,private router: Router) {
  }

  ngOnInit(): void {
    this.subscription=this.notification.notificationChanged.subscribe((data)=>{
      this.message=this.notification.message;
      this.isError=this.notification.isError;
      setTimeout(()=>{
        this.message='';
      },4500)
    })
    // const token = sessionStorage.getItem('token');
    // if (token) {
    //   this.router.navigate(['/']);
    // }
  }

  hidePopup(){
    this.notification.changeMessage('',true);
  }
}
