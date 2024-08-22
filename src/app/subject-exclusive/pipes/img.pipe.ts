import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(nombreImagen: string | undefined): string {
    const baseUrl = 'http://localhost/fastLearning-backend/public/storage/';
    const defaultImage = "/assets/img/no-hay-foto-disponible.jpg";
    if (nombreImagen) {
      return baseUrl + nombreImagen.replace('public/', '');
    } else {
      return defaultImage;
    }
  }

}
