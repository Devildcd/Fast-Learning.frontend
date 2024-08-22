import { Subject } from "src/app/subject/interfaces/subject.interface";

export interface SubjectExclusive {
    id?: number,
    subject_id: Subject,
    name: string,
    description: string,
    availability: string,
    exclusive_images?: ExclusiveImages[],
    exclusive_docs?: ExclusiveDocs[]
}

export interface ExclusiveImages {
    id?: number,
    exclusive_id: number,
    path: string
}

export interface ExclusiveDocs {
    id?: number,
    exclusive_id: number,
    path: string
}