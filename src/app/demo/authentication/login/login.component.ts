// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AlertComponent } from 'src/app/theme/shared/components/alert/alert.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, AlertComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  loginForm: FormGroup;

  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertVisible: boolean = false; // Track the alert's visibility
  alertTimeout: any; // To store the timeout ID

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        })
        .subscribe({
          next: (response) => {
            localStorage.setItem('sessionToken', response.token);

            this.router.navigate(['/dashboard/default']);
          },
          error: (error) => {
            console.log(error.error.message);
            this.showAlert(error.error.message, 'danger');
          }
        });
    }
  }

  showAlert(message: string, type: 'success' | 'danger') {
    console.log(message);
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    // Clear any existing timeout to prevent multiple timeouts running
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    // Hide the alert after 5 seconds (5000 milliseconds)
    this.alertTimeout = setTimeout(() => {
      this.alertVisible = false; // Hide the alert after the specified time
    }, 5000);
  }

  closeAlert() {
    this.alertVisible = false; // Hide the alert
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout); // Clear timeout if alert is closed manually
    }
  }
}
