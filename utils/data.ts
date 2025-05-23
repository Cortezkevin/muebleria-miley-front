export const testCategoryData = [
  { id: 1, name: 'Dormitorios', image: 'https://images.woodenstreet.de/image/data/Blog%20images/7thapril/2.jpg', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
  { id: 2, name: 'Salas', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
  { id: 3, name: 'Muebles', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
  { id: 4, name: 'Comederos', image: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' }
];

export type IProductCharacteristics = {
  name: string;
  value: string;
}

type IProduct = {
  id: number;
  name: string;
  characteristics?: IProductCharacteristics[],
  discountPercent: number;
  category: string;
  image: string;
  price: number;
  description: string;
}

export const testProductData: IProduct[] = [
  { id: 1, name: 'Cama 1', characteristics: [{ name: "Tamaño", value: "2 plazas" }], discountPercent: 10, category: 'Dormitorio', image: 'https://res.cloudinary.com/dl4jpberv/image/upload/v1716927593/java_api/product/49975b24-75b5-44f3-8b10-bf9782366c93_2.webp', price: 100, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
  { id: 2, name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem exercitationem. Quos nulla debitis sint', discountPercent: 10, category: 'Salas', image: 'https://res.cloudinary.com/dl4jpberv/image/upload/v1716926893/java_api/product/c33155a0-676b-4dc7-9779-ab671097237a_3.webp', price: 200, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
  { id: 3, name: 'Cama 3', discountPercent: 10, category: 'Muebles', image: 'https://res.cloudinary.com/dl4jpberv/image/upload/v1716913093/java_api/product/063eb7c2-5ee9-4eb5-be35-2f01327fa92e_3.webp', price: 300, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
  { id: 4, name: 'Cama 4', characteristics: [{ name: "Color", value: "Blanco" }, { name: "Acabado", value: "Mica" }], discountPercent: 10, category: 'Dormitorio', image: 'https://res.cloudinary.com/dl4jpberv/image/upload/v1716926494/java_api/product/efe7dd48-0ef5-45c7-bb06-a28ab681a9aa_2.webp', price: 400, description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, quasi ea minima molestias quos repudiandae aliquid dolore officia placeat fuga provident deserunt, esse aut eos totam quis alias aspernatur magni?' },
]