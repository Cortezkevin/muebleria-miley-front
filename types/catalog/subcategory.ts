import { CategoryDTO } from "./category";

export type SubCategoryDTO = {
    id: string;
    name: string;
    description: string;
    category: CategoryDTO;
    url_image: string;
}

export type DetailedSubCategoryDTO = {
    id: string;
    name: string;
    description: string;
    category: CategoryDTO;
    url_image: string;
}

export type CreateSubCategoryDTO = {
    name: string;
    description: string;
    category_id: string;
}

export type UpdateSubCategoryDTO = {
    id: string;
    newName: string;
    newDescription: string;
    newCategoryId: string;
}