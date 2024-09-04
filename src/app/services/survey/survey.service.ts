import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define la interfaz Survey para el tipo de datos que estás enviando
export interface Survey {
  id?: number; // Asegúrate de que el id esté definido si lo necesitas para actualización y eliminación
  name: string;
  description: string;
  showButtons?: boolean;
}

export interface PaginatedSurveys {
  content: Survey[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/survey'; // Base URL

  constructor(private http: HttpClient) {}

  // Nuevo método para obtener todas las encuestas
  getAllSurveys(page: number, size: number): Observable<PaginatedSurveys> {
    return this.http.get<PaginatedSurveys>(`${this.apiUrl}/findAll?page=${page}&size=${size}`).pipe(
      catchError(this.handleError)
    );
  }

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${this.apiUrl}/createSurvey`, survey).pipe(
      catchError(this.handleError)
    );
  }

  updateSurvey(survey: Survey): Observable<Survey> {
    if (survey.id != null) {
      return this.http.put<Survey>(`${this.apiUrl}/updateSurvey/${survey.id}`, survey).pipe(
        catchError(this.handleError)
      );
    } else {
      return throwError(() => new Error('Survey ID is required for update'));
    }
  }

  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteOne/${id}`, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código del error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
