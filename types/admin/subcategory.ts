export type CreateSubCategoryModal = {
  name: string;
  description: string;
  category_id: string;
  file: File;
}

export type UpdateSubCategoryModal = {
  id: string;
  newName: string;
  newDescription: string;
  newCategoryId: string;
  file?: File;
}