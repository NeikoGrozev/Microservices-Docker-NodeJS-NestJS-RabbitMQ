import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateOrderProps,
    OrderDataProps,
    OrderItemProps,
    OrderProps,
    OrderStatus,
} from 'src/interfaces/OrderProps';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class OrdersService implements OnModuleInit {
    private readonly orderExchange: string;
    private readonly orderCreateResponse: string;
    private readonly orderResponseQueue: string;
    private readonly orderCreated: string;

    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private rabbitMqService: RabbitMQService,
    ) {
        this.orderExchange = this.configService.get<string>(
            'ORDER_EXCHANGE',
        ) as string;
        this.orderCreateResponse = this.configService.get<string>(
            'ORDER_CREATED_RESPONSE',
        ) as string;
        this.orderResponseQueue = this.configService.get<string>(
            'ORDER_RESPONSE_QUEUE',
        ) as string;
        this.orderCreated = this.configService.get<string>(
            'ORDER_CREATED',
        ) as string;
    }

    async onModuleInit() {
        await this.rabbitMqService.assertExchange(this.orderExchange);
        await this.rabbitMqService.assertQueue(this.orderResponseQueue);
        await this.rabbitMqService.bindQueue(
            this.orderExchange,
            this.orderResponseQueue,
            this.orderCreateResponse,
        );
        await this.rabbitMqService.consume(
            this.orderResponseQueue,
            this.handleProductResponse.bind(this),
        );
    }

    private async handleProductResponse(msg: amqp.Message) {
        const orderData: OrderDataProps = JSON.parse(msg.content.toString());
        const routingKey = msg.fields.routingKey;

        if (orderData.id && routingKey === this.orderCreateResponse) {
            await this.prisma.order.update({
                where: { id: orderData.id },
                data: {
                    status: orderData.isProductsAvailable
                        ? OrderStatus.confirmed
                        : OrderStatus.canceled,
                },
            });
        }
    }

    async getAllOrders() {
        try {
            return await this.prisma.order.findMany({
                include: {
                    orderItems: true,
                },
            });
        } catch (error) {
            throw new Error(`Failed to fetch orders: ${error}`);
        }
    }

    async getOrderById(id: string): Promise<OrderProps> {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id },
                include: {
                    orderItems: true,
                },
            });

            if (!order) {
                throw new NotFoundException('Order not found');
            }

            return {
                ...order,
                status: order.status as OrderStatus,
                orderItems: (order.orderItems as OrderItemProps[]).map(
                    (item) => ({
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                    }),
                ),
            };
        } catch (error) {
            throw new Error(`Failed to fetch order: ${error}`);
        }
    }

    async createOrder(data: CreateOrderDto): Promise<CreateOrderProps> {
        const { customerId, shippingAddress, orderItems, notes } = data;

        try {
            const order = await this.prisma.order.create({
                data: {
                    customerId,
                    totalQuantity: orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                    ),
                    totalPrice: orderItems.reduce(
                        (sum, item) => sum + item.quantity * item.price,
                        0,
                    ),
                    shippingAddress,
                    notes,
                    orderItems: {
                        create: orderItems.map((item) => ({
                            productId: item.productId,
                            price: item.price,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: { orderItems: true },
            });

            this.rabbitMqService.publish(
                this.orderExchange,
                this.orderCreated,
                order,
            );

            return { orderId: order.id, orderStatus: OrderStatus.pending };
        } catch (error) {
            throw new Error(`Failed to create order: ${error}`);
        }
    }

    async updateOrder(id: string, data: UpdateOrderDto) {
        try {
            return await this.prisma.order.update({
                where: { id },
                data: {
                    ...data,
                    totalQuantity: data.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                    ),
                    totalPrice: data.orderItems.reduce(
                        (sum, item) => sum + item.quantity * item.price,
                        0,
                    ),
                    orderItems: {
                        deleteMany: {},
                        create: data.orderItems.map((item) => ({
                            productId: item.productId,
                            price: item.price,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: { orderItems: true },
            });
        } catch (error) {
            throw new Error(`Failed to update order: ${error}`);
        }
    }

    async deleteOrder(id: string) {
        try {
            await this.prisma.order.delete({
                where: { id },
            });

            return `Order with ID: ${id} has been deleted`;
        } catch (error) {
            throw new Error(`Failed to delete order: ${error}`);
        }
    }

    async removeAllOrders() {
        try {
            await this.prisma.order.deleteMany();

            return `All Orders has been deleted`;
        } catch (error) {
            throw new Error(`Failed to delete orders: ${error}`);
        }
    }
}
