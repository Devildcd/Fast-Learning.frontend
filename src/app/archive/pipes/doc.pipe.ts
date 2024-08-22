import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(path: string | undefined): string | undefined {
    if (path) {
      // Extraer el nombre del archivo de la ruta
      const parts = path.split('/');
      return parts[parts.length - 1];
    }
    return undefined;
  }

}
