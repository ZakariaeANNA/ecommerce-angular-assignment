export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    quantity: number;
    discountedPrice: number;
    total: number;
    category: string;
    thumbnail: string;
    images: string[];
}