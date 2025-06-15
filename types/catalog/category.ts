import { SubCategoryDTO } from "./subcategory";

export type CategoryDTO = {
    id: string;
    name: string;
    description: string;
    url_image: string
}

export type DetailedCategoryDTO = {
    id: string;
    name: string;
    description: string;
    url_image: string
    subCategoryList: SubCategoryDTO[];
}

export type CreateCategoryDTO = {
    name: string;
    description: string;
}

export type UpdateCategoryDTO = {
    id: string;
    newName: string;
    newDescription: string;
}