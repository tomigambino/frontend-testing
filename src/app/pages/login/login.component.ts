import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public loginForm!: FormGroup
  errorMsg: string = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  async getDataLogin() {
    // Limpiar mensaje de error previo
    this.errorMsg = '';
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMsg = 'Por favor, completa correctamente todos los campos.';
      return; // Importante: detener ejecución aquí
    }
    
    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    } catch (e: any) {
      // Mostrar el mensaje específico del error
      this.errorMsg = e.message;
      console.error(e);
    }
  }
}