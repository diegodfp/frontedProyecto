import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarencuestaComponent } from './visualizarencuesta.component';

describe('VisualizarencuestaComponent', () => {
  let component: VisualizarencuestaComponent;
  let fixture: ComponentFixture<VisualizarencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarencuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
