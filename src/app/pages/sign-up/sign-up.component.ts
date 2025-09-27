import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  public signUpForm!: FormGroup;
  errorMsg: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[^0-9]+$/)]],
      phone: ['', [Validators.pattern(/^[0-9+\-()\s]*$/)]], // opcional, solo números y símbolos básicos
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async getDataSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.errorMsg = 'Incomplete or incorrect information';
      return;
    }

    try {
      const { firstName, lastName, phone, email, password } = this.signUpForm.value;
      await this.authService.signUp(firstName, lastName, phone, email, password);
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error("Algo salió mal", error);
      this.errorMsg = 'Error during registration';
    }
  }
}
