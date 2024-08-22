import { Subject } from "src/app/subject/interfaces/subject.interface";

export interface Archive {
    id?: number,
    subject_id: Subject,
    path: string
}