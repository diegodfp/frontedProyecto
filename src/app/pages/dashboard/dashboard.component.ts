import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userLoginOn: boolean = true;  // Suponiendo que tienes una lógica para esto

  constructor(private router: Router) {}

  navigateTo(route: string) {
    if (route === 'gestionar-encuestas') {
      this.router.navigate(['/gestionar-encuestas']);
    } else if (route === 'visualizar-encuestas') {
      this.router.navigate(['/visualizar-encuestas']);
    }
  }
}
