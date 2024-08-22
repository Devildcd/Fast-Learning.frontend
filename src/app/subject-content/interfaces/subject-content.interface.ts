import { ContentLevel } from "src/app/content-level/interfaces/content-level.interface";
import { ContentType } from "src/app/content-type/interfaces/content-type.interface";
import { Subject } from "src/app/subject/interfaces/subject.interface";

export interface SubjectContent {
    id?: number,
    subject_id: Subject,
    content_level_id: ContentLevel,
    content_type_id: ContentType,
    name: string,
    usage_level: string,
    description: string
    subject_content_images?: SubjectContentImages[],
    subject_content_docs?: SubjectContentDocs[],
}

export interface SubjectContentImages {
    id?: number,
    subject_content_id: number,
    path: string
}

export interface SubjectContentDocs {
    id?: number,
    subject_content_id: number,
    path: string
}