import { CartType } from "./CartType";

export interface OrderType {
    orderId?: number;
    createdAt?: string;
    status?: 'pending' | 'rejected' | 'accepted' | 'shipped';
    cart?: CartType;
}