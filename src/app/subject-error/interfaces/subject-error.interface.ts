import { Subject } from "src/app/subject/interfaces/subject.interface";

export interface SubjectError {
    id?: number,
    subject_id: Subject,
    name: string,
    description: string,
    error_image?: SubjectErrorImage
}

export interface SubjectErrorImage {
    id?: number,
    subject_id: number,
    urlImage: string
}