import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification/notification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-layout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error-layout.component.html',
  styleUrl: './error-layout.component.css'
})
export class ErrorLayoutComponent {
}
