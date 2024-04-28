import { Contenido } from "../../contenidos/interfaces/contenido.interface";

export interface Materia {
    id?: number,
    nombre: string,
    descripcion: string,
    foto?: string,
    contenidos?: Contenido
}