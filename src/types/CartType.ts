export interface CartType {
    cartId: number;
    userId: number;
    createdAt: Date;
    user: any;
    cartFoods: {
        cartFoodId: number;
        foodId: number;
        quantity: number;
        food: {
            foodId: number;
            name: string;
            category: {
                categoryId: number;
                name: string;
            }
            foodPrices: {
                foodPricesId: number;
                price: number;
            }[]
        }
    }[]
}
