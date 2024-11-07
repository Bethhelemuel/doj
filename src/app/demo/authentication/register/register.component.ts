import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/theme/shared/components/alert/alert.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, SharedModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  SignUpOptions = [
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

  signUpForm: FormGroup; // Form group for the sign-up form
  submitted: boolean = false; // Track form submission status
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertVisible: boolean = false; // Track the alert's visibility
  alertTimeout: any; // To store the timeout ID

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.signUpForm.get('role').disable();
  }

  // Initialize the form with default controls and validators
  initializeForm(): void {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        emailAddress: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: this.passwordMatchValidator // Custom validator for password match
      }
    );

    // Subscribe to emailAddress changes
    this.signUpForm.get('emailAddress').valueChanges.subscribe((email) => {
      if (this.signUpForm.get('emailAddress').valid) {
        this.signUpForm.get('role').enable(); // Enable the role field if email is valid

        // Set role based on email domain
        if (email.endsWith('@justice.gov.za')) {
          this.signUpForm.get('role').disable();
          this.signUpForm.get('role').setValue('official');
        } else {
          this.signUpForm.get('role').setValue('liquidator');
          this.signUpForm.get('role').disable();
        }
      } else {
        this.signUpForm.get('role').disable(); // Disable the role field if email is invalid
        this.signUpForm.get('role').setValue(''); // Clear the role field
      }
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Handle form submission
  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService
        .register({
          firstName: this.signUpForm.get('firstName')?.value,
          lastName: this.signUpForm.get('lastName')?.value,
          email: this.signUpForm.get('emailAddress')?.value,
          password: this.signUpForm.get('confirmPassword')?.value,
          role: this.signUpForm.get('role')?.value
        })
        .subscribe({
          next: (response) => {
            // Show the success alert
            this.showAlert(response.message, 'success');
  
            // Set a timeout to close the alert and open the OTP modal in sync
            setTimeout(() => {
              // Close the alert
              this.closeAlert();  // Assuming you have a method to close the alert
  
              // Open the OTP modal
              const dialogRef = this.dialog.open(OtpComponent, {
                data: {
                  email: this.signUpForm.get('emailAddress')?.value,
                }
              });
            }, 3000); // Adjust the timeout duration as needed
          },
          error: (error) => {
            // Show an error alert if registration fails
            this.showAlert(error.error.message, 'danger');
          }
        });
    } else {
      // Show an alert if form validation fails
      this.showAlert('Please fill in all required fields correctly.', 'danger');
    }
  }
  

  showAlert(message: string, type: 'success' | 'danger') {
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
  // Utility getter to access form controls easily
  get f() {
    return this.signUpForm.controls;
  }

  login(){
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
