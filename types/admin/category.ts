export type CreateCategoryModal = {
  name: string;
  description: string;
  file: File;
}

export type UpdateCategoryModal = {
  name: string;
  description: string;
  file?: File;
}