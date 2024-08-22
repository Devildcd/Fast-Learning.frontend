import { Category } from "src/app/category/interfaces/category.interface";
import { Profile } from "src/app/profile/interfaces/profile.interface";
import { Specialization } from "src/app/specialization/interfaces/specialization.interface";

export interface Subject {
    id?: number,
    specialization_id: Specialization,
    title: string,
    description: string,
    photo?: SubjectPhoto,
}

export interface SubjectPhoto {
    id?: number,
    subject_id: number,
    urlPhoto: string
}