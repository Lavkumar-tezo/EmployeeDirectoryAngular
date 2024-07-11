import { Component, Input } from '@angular/core';
import { Employee } from '../../../core/models/employee';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input('employee') employee:Employee;
}
