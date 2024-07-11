import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authorized-layout',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent,RouterOutlet],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.css'
})
export class AuthorizedLayoutComponent {
  @ViewChild('wrapper') wrapperElement:ElementRef;

  changeSidebarLayout(value:boolean){
    this.wrapperElement.nativeElement.style.gridTemplateColumns= (value) ? '1fr 4.5fr':"1fr 20fr" 
  }
}
