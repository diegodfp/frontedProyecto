import { Component, OnInit } from '@angular/core';
import { PaginatedSurveys, Survey, SurveyService } from 'src/app/services/survey/survey.service';

@Component({
  selector: 'app-gestionarencuesta',
  templateUrl: './gestionarencuesta.component.html',
  styleUrls: ['./gestionarencuesta.component.css']
})
export class GestionarencuestaComponent implements OnInit {
  surveys: Survey[] = [];
  selectedSurvey: Survey | null = null;
  showPopup: boolean = false;
  showSurveyPopup: boolean = false;
  newSurvey: Survey = { name: '', description: '' };
  surveyForm: Survey = { name: '', description: '' };
  isEditing: boolean = false;
  showButtons: boolean = false;

  // Definir las propiedades page y size
  page: number = 0;  // Página inicial
  size: number = 10; // Tamaño de página predeterminado
  totalPages: number = 1; // Total de páginas

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();  // Cargar las encuestas al inicializar el componente
  }

  loadSurveys(): void {
    this.surveyService.getAllSurveys(this.page, this.size).subscribe(
      (response: PaginatedSurveys) => {
        this.surveys = response.content;  // Asegúrate de asignar solo el array de encuestas
        this.totalPages = response.totalPages;
      },
      (error) => {
        alert('Error al cargar las encuestas: ' + error.message);
      }
    );
  }

  openSurveyPopup() {
    this.showPopup = true;
  }

  closeSurveyPopup() {
    this.showPopup = false;
    this.newSurvey = { name: '', description: '' };
  }

  createSurvey() {
    this.surveyService.createSurvey(this.newSurvey).subscribe(
      (response) => {
        this.surveys.push(response);
        this.closeSurveyPopup();
        alert('Encuesta creada exitosamente.');
      },
      (error) => {
        alert('Error al crear la encuesta: ' + error);
        this.closeSurveyPopup();
      }
    );
  }

  selectSurvey(index: number) {
    this.selectedSurvey = { ...this.surveys[index] }; // Create a copy for editing
    this.surveyForm = { ...this.selectedSurvey }; // Initialize form with selected survey data
    this.isEditing = true;
    this.showSurveyPopup = true;
  }

  closeSurveyDetails() {
    this.showSurveyPopup = false;
    this.selectedSurvey = null;
  }

  saveSurvey() {
    if (this.isEditing && this.selectedSurvey) {
      this.surveyService.updateSurvey(this.surveyForm).subscribe(
        (response) => {
          // Update the survey in the list
          const index = this.surveys.findIndex(s => s.id === this.surveyForm.id);
          if (index !== -1) {
            this.surveys[index] = response;
          }
          this.closeSurveyDetails();
          alert('Encuesta actualizada exitosamente.');
        },
        (error) => {
          alert('Error al actualizar la encuesta: ' + error);
        }
      );
    } else {
      this.isEditing = true;
    }
  }

  deleteSurvey() {
    if (this.surveyForm.id != null) {
      this.surveyService.deleteSurvey(this.surveyForm.id).subscribe(
        () => {
          this.surveys = this.surveys.filter(s => s.id !== this.surveyForm.id);
          this.closeSurveyDetails();
          alert('Encuesta eliminada exitosamente.');
        },
        (error) => {
          alert('Error al eliminar la encuesta: ' + error);
        }
      );
    }
  }

  // manejo de botones:
  toggleButtons(): void {
    this.showButtons = !this.showButtons;
}
}
