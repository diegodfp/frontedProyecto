import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// Importa tu guard si lo tienes
// import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' }, // Redirige a la página de login por defecto
  { path: 'iniciar-sesion', component: LoginComponent },
  // { path: 'inicio', component: DashboardComponent, canActivate: [AuthGuard] }, // Utiliza un guard para proteger el dashboard
  { path: 'inicio', component: DashboardComponent }, // Sin guard, el dashboard está accesible a todos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
