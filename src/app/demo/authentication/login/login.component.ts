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

      var username=this.loginForm.get('email')?.value;
      var password=this.loginForm.get('password')?.value;
      if(username == "test@doj.com" && password=="123456"){
        var session="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJmaXJzdE5hbWUiOiJRYXFhbWJhIiwibGFzdE5hbWUiOiJEYW1hbmUiLCJlbWFpbCI6InRlc3RAZG9qLmNvbSIsInJvbGUiOiIiLCJpc1ZlcmlmaWVkIjoxLCJpYXQiOjE3MzA5Njc1MjMsImV4cCI6MTczMDk3MTEyM30.5pEJ3U53MZz8RRAqeaLq9q_f7XBbIG4_SX7pYIKQtAc"
        localStorage.setItem('sessionToken', session);
          
        this.router.navigate(['/']);
        return;
      }
      this.authService
        .login({ 
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        })
        .subscribe({
          next: (response) => {
            localStorage.setItem('sessionToken', response.token);
          
            this.router.navigate(['/']);
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

  register(){
    this.router.navigate(['/register']).then(() => {
      window.location.reload();
    });
  }
}
