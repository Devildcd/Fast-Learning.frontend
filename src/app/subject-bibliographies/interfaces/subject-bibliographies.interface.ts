import { Subject } from "src/app/subject/interfaces/subject.interface";

export interface SubjectBibliographies {
    id?: number,
    subject_id: Subject,
    url: string,
    description: string,
    type: boolean
}