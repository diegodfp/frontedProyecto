import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;

  // Agregar arreglo para manejar las tablas y su estado
  tables = [
    { name: 'Surveys', showOptions: false },
    { name: 'Chapters', showOptions: false },
    { name: 'Questions', showOptions: false },
    { name: 'SubQuestions', showOptions: false }
  ];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

  }
  // Función para alternar el estado de las opciones CRUD
  toggleOptions(table: any) {
    table.showOptions = !table.showOptions;
  }


}
