import { ColorImagesDTO, ProductFeatureDTO } from "../catalog";

export type CreateProductModal = {
  name: string;
  description: string;
  price: string;
  stock: number;
  subcategory_id: string;
  //supplierId?: string;
  files: File[];
  features: ProductFeatureDTO[];
  colorImages: ColorImagesDTO[];
  //materials?: ProductMaterial[]
}

/* export type UpdateProduct = {
  id: string;
  newName: string;
  newDescription: string;
  newPrice: string;
  newStock: number;
  newSubCategoryId: string;
  newCollectionId: string;
  newSupplierId?: string;
  files?: File[];
  materials?: ProductMaterial[]
} */