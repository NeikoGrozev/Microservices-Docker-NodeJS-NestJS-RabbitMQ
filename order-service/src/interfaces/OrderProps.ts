export interface OrderProps {
    id: string;
    customerId: string;
    totalQuantity: number;
    totalPrice: number;
    shippingAddress: string;
    status: OrderStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    orderItems: OrderItemProps[];
}

export interface OrderItemProps {
    productId: string;
    price: number;
    quantity: number;
}

export interface CreateOrderProps {
    orderId: string;
    orderStatus: OrderStatus;
}

export interface OrderDataProps {
    id: string;
    isProductsAvailable: boolean;
}

export enum OrderStatus {
    pending = 'PENDING',
    confirmed = 'CONFIRMED',
    canceled = 'CANCELED',
}
