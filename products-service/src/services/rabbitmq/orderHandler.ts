import { Channel } from 'amqplib';
import { decreaseProductsQuantity, getProductById } from '../prismaService';
import { OrderItemProps } from '../../interfaces/orderProps';
import {
    assertExchange,
    assertQueue,
    bindQueue,
    publish,
} from './rabbitMQService';

const ORDER_EXCHANGE = process.env.ORDER_EXCHANGE as string;
const ORDER_QUEUE = process.env.ORDER_QUEUE as string;
const ORDER_CREATED = process.env.ORDER_CREATED as string;
const ORDER_CREATED_RESPONSE = process.env.ORDER_CREATED_RESPONSE as string;

export const setupOrderQueueConsumer = async (channel: Channel) => {
    await assertExchange(channel, ORDER_EXCHANGE);
    await assertQueue(channel, ORDER_QUEUE);
    await bindQueue(channel, ORDER_EXCHANGE, ORDER_QUEUE, ORDER_CREATED);

    channel.consume(ORDER_QUEUE as string, async (msg) => {
        if (msg !== null) {
            const content = JSON.parse(msg.content.toString());
            const routingKey = msg.fields.routingKey;

            if (content && routingKey === ORDER_CREATED) {
                const isProductsAvailable = await handleOrderCreated(
                    content.orderItems,
                );

                if (isProductsAvailable) {
                    await decreaseProductsQuantity(content.orderItems);
                }

                const responseData = {
                    id: content.id,
                    isProductsAvailable,
                };

                publish(
                    channel,
                    ORDER_EXCHANGE,
                    ORDER_CREATED_RESPONSE,
                    responseData,
                );
            }

            channel.ack(msg);
        }
    });
};

const handleOrderCreated = async (
    orderItems: OrderItemProps[],
): Promise<boolean> => {
    try {
        if (!orderItems.length) {
            return false;
        }

        const productsAvailability = orderItems.map(
            async ({ productId, quantity }) => {
                const product = await getProductById(productId);
                return {
                    id: productId,
                    isAvailable:
                        (product?.quantity ?? 0) >= quantity ? true : false,
                };
            },
        );
        const results = await Promise.all(productsAvailability);

        return !results.some((x) => x.isAvailable === false);
    } catch (error) {
        console.error('Error handling order created event:', error);
        return false;
    }
};
