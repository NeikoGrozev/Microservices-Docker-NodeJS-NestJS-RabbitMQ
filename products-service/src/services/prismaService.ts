import { PrismaClient } from '@prisma/client';
import { OrderItemProps } from '../interfaces/orderProps';

const prisma = new PrismaClient();

export const getProducts = async () => {
    return await prisma.product.findMany();
};

export const getProductById = async (id: string) => {
    return await prisma.product.findUnique({
        where: { id },
    });
};

export const createProduct = async (data: any) => {
    return await prisma.product.create({
        data,
    });
};

export const updateProduct = async (id: string, updateData: any) => {
    return await prisma.product.update({
        where: { id },
        data: { ...updateData },
    });
};

export const deleteProduct = async (id: string) => {
    return await prisma.product.delete({
        where: { id },
    });
};

export const deleteProducts = async () => {
    return await prisma.product.deleteMany();
};

export const decreaseProductsQuantity = async (
    orderItems: OrderItemProps[],
) => {
    orderItems.map(async ({ productId, quantity }) => {
        try {
            await prisma.product.update({
                where: { id: productId },
                data: {
                    quantity: {
                        decrement: quantity,
                    },
                },
            });
        } catch (error) {
            console.error(`Product update failed: ${productId}`, error);
        }
    });
};
