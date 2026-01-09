import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

 private readonly authService = inject(AuthService);
 private readonly formBuilder = inject(FormBuilder);
 private readonly router = inject(Router);

 isLoading: boolean = false;
 msgError: string = '';
 isSuccess :string = '';

  RegisterForm: FormGroup = this.formBuilder.group({ 
    FullName: ['', [Validators.minLength(9), Validators.maxLength(50), Validators.required]],
    Email: ['', [Validators.email, Validators.required]],
    Password: ['', [Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/), Validators.required]],
    PhoneNumber: ['', [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required]],
  });


  submitForm(): void {
    if (this.RegisterForm.valid) {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('FullName', this.RegisterForm.value.FullName);
      formData.append('Email', this.RegisterForm.value.Email);
      formData.append('Password', this.RegisterForm.value.Password);
      formData.append('PhoneNumber', this.RegisterForm.value.PhoneNumber);

      this.authService.sendRegisterForm(formData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            // Navigate to login page or show success message
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
            
            this.isSuccess = 'Registration successful! Please log in.';
          } 
          this.isLoading = false;
        },
        error: (err:HttpErrorResponse) => {
          console.error('Error:', err);

         this.msgError= err.error.message
          this.isLoading = false;
        },
      });
    } else {
      this.RegisterForm.markAllAsTouched();
    }

  }

 
  
}
