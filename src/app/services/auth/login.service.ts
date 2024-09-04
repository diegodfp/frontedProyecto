import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, throwError, catchError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.urlHost + "auth/login"; // Asegúrate de que esta URL sea correcta

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>(sessionStorage.getItem("token") || "");

  constructor(private http: HttpClient) {
    // Inicializar el estado del login
    this.currentUserLoginOn.next(!!sessionStorage.getItem("token"));
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.currentUserData.next("");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retornó el código de estado', error.status);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }
}
