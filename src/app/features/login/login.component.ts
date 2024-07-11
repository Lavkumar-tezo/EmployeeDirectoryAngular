import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { PageLayoutService } from '../../core/services/page-layout/page-layout.service';
import { PageLayout } from '../../core/enums/Page-layout';
import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterModule, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginForm: FormGroup;
  constructor(private form: FormBuilder, private authService: AuthService, private router: Router, private notification: NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.form.group({
      username: ['lav@gmail.com', Validators.required],
      password: ['1234567890', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(res => {
        if (res) {
          this.notification.changeMessage('Login Successful', false);
          this.router.navigate(['/employees']);
        }
        else {
          this.notification.changeMessage("Login Failed", true);
        }
      })
    }
  }

}