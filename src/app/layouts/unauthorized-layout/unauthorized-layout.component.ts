import { Component } from '@angular/core';
import { LoginComponent } from '../../features/login/login.component';

@Component({
  selector: 'app-unauthorized-layout',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './unauthorized-layout.component.html',
  styleUrl: './unauthorized-layout.component.css'
})
export class UnauthorizedLayoutComponent {

}
