import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private loginService: LoginService
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Ya no hay validación de email
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Puedes poner lógica de inicialización adicional aquí si es necesario
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          // Redirigir a otra página o manejar el éxito
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = 'Error de autenticación. Por favor, verifica tus credenciales.'; // Mensaje de error más claro
        },
        complete: () => {
          console.info("Login completo");
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}
