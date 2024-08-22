import { Category } from "src/app/category/interfaces/category.interface";

export interface Profile {
    id?: number,
    category_id: Category,
    name: string,
    description: string
}