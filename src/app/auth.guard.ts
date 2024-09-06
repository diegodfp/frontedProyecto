import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token'); 
    if (token) {
      return true; // El usuario está autenticado
    } else {
      this.router.navigate(['/iniciar-sesion']); 
      return false;
    }
  }
}
