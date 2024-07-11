import { CommonModule, DOCUMENT, Location, NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, DoCheck, EventEmitter, HostListener, Inject, OnInit, Output} from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgIf,NgClass,CommonModule,NgStyle],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements DoCheck,OnInit {
  isUpdateBoxVisible:boolean=true;
  isSidebarVisible:boolean=true;
  employeeLinkImg:string='assets/icons/employee-red.svg';
  roleLinkImg:string='assets/icons/role-black.svg';
  params:Subscription;
  url:string;
  @Output() sidebarEmitter:EventEmitter<boolean>= new EventEmitter<boolean>();
  
  constructor(private location:Location,@Inject(DOCUMENT) private document: Document){

  }
  ngOnInit(): void {
    if(window.innerWidth< 720){
      console.log(window.innerWidth)
      this.isSidebarVisible=!this.isSidebarVisible;
      this.sidebarEmitter.emit(this.isSidebarVisible);
    }
  }

  ngDoCheck(): void {
    this.url=this.location.path();
    if(this.url.includes("employees")){
      this.employeeLinkImg='assets/icons/employee-red.svg';
      this.roleLinkImg='assets/icons/role-black.svg';
    }
    else{
      this.employeeLinkImg='assets/icons/employee-black.svg';
      this.roleLinkImg='assets/icons/role-red.svg';
    }
  }
  hideUpdateBox(){
    this.isUpdateBoxVisible=false;
  }



  toggleSidebarSize(){
    if(this.document.body.offsetWidth > 720){
      this.isSidebarVisible=!this.isSidebarVisible;
      this.sidebarEmitter.emit(this.isSidebarVisible);
    }
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
    onResize(width: number) {
      this.isSidebarVisible= (width < 720) ?  false:true;
      this.sidebarEmitter.emit(this.isSidebarVisible);
  }
}
