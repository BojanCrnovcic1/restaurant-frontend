import { FeatureType } from "./FeatureType";

export interface FoodType {
    foodId?: number;
    name?: string;
    description?: string;
    price?: number;
    createdAt?: Date;
    foodFeatures?:{
        foodFeatureId: number;
        featureId: number;
    }[];
    features?: FeatureType[];
    foodPrices?: {
        foodPriceId: number;
        price: number;
    }[];
    photos?: {
        photoId: number;
        imagePath: string;
    }[];
    categoryId?: number;
    category?: {
        name: string;
    }
}