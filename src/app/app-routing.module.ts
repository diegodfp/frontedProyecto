import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GestionarencuestaComponent } from './pages/dashboard/gestionarencuesta/gestionarencuesta.component';
import { VisualizarencuestaComponent } from './pages/dashboard/visualizarencuesta/visualizarencuesta.component';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' }, // Redirige a la página de login por defecto
  { path: 'iniciar-sesion', component: LoginComponent }, // Ruta accesible sin autenticación
  { path: 'inicio', component: DashboardComponent, canActivate: [AuthGuard] }, // Protegido por el AuthGuard
  { path: 'gestionar-encuestas', component: GestionarencuestaComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'visualizar-encuestas', component: VisualizarencuestaComponent, canActivate: [AuthGuard] }, // Protegido
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
