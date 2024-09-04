import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        this.cd.detectChanges(); // Forzar la detección de cambios
      }
    });

    // Verificar si hay un token almacenado y establecer el estado de userLoginOn
    const token = localStorage.getItem('token');
    this.userLoginOn = !!token; // Convierte la existencia del token en un booleano
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
