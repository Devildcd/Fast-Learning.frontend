import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Contenido } from 'src/app/FastLearning/contenidos/interfaces/contenido.interface';
import { ContenidoService } from 'src/app/FastLearning/contenidos/services/contenido.service';
import { Materia } from 'src/app/FastLearning/materias/interfaces/materia.interface';
import { MateriaService } from 'src/app/FastLearning/materias/services/materia.service';
import { SharedService } from 'src/app/FastLearning/materias/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  controlUrl!: string;
  materia!: Materia;
  contenidos: Contenido[] = [];
  materiaID: number = 0;

  constructor(
    private router: Router,
    private contenidoService: ContenidoService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.idUpdatedObservable.subscribe((id) => {
      if (id !== 0) { // Evitar la emisión del valor 0 si no es relevante para tu lógica
        this.materiaID = id;
        console.log(this.materiaID);
        this.contenidoService.getContenidosMateriasId(this.materiaID)
        .subscribe((contenidos) => {
          this.contenidos = contenidos;
          console.log(contenidos);
        });
      }
    });
    this.obtenerPrimerSegmentoUrl();
  }
  

  obtenerPrimerSegmentoUrl() {
    const urlTree = this.router.createUrlTree([]);
    const url = this.router.serializeUrl(urlTree);
    console.log(url);
    const segmentos = url.split('/');
    const primerSegmento = segmentos[1];
    console.log(primerSegmento);
    this.controlUrl = primerSegmento;
    console.log(this.controlUrl);
  }
}
