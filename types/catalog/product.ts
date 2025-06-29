import { SimpleSupplierDTO } from "../admin";
import { SubCategoryDTO } from "./subcategory";

export type ProductDTO = {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory: SubCategoryDTO;
    supplier?: SimpleSupplierDTO;
    price: string;
    stock: number;
    images: string[];
    acquisitionType: 'BOUGHT' | 'MANUFACTURED';
}

export type DetailedProductDTO = {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: string;
    stock: number;
    images: string[];
    colors: ProductColorDTO[];
    features: ProductFeatureDTO[];
    acquisitionType: 'BOUGHT' | 'MANUFACTURED';
}

export type CreateProductDTO = {
    name: string;
    description: string;
    price: string;
    stock: number;
    subcategoryId: string;
    features?: ProductFeatureDTO[];
    colorImages?: ColorImagesDTO[];
}

export type ProductColorDTO = {
    color: string;
    images: ProductImageDTO[]
}

export type ProductFeatureDTO = {
    feature: string;
    value: string;
}

export type ColorImagesDTO = {
    color: string;
    fileNames: string[];
}

export type ProductImageDTO = {
    url: string;
    imageId: string;
}