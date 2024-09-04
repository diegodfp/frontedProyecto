import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarencuestaComponent } from './gestionarencuesta.component';

describe('GestionarencuestaComponent', () => {
  let component: GestionarencuestaComponent;
  let fixture: ComponentFixture<GestionarencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarencuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
