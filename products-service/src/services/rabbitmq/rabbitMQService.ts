import { Channel } from 'amqplib';
import { setupOrderQueueConsumer } from './orderHandler';

export const rabbitMQListener = async (channel: Channel) => {
    await setupOrderQueueConsumer(channel);
};

export const assertExchange = async (
    channel: Channel,
    exchange: string,
    options = { durable: false },
) => {
    await channel.assertExchange(exchange, 'direct', options);
};

export const assertQueue = async (
    channel: Channel,
    queue: string,
    options = { durable: false },
) => {
    await channel.assertQueue(queue, options);
};

export const bindQueue = async (
    channel: Channel,
    exchange: string,
    queue: string,
    routingKey: string,
) => {
    await channel.bindQueue(queue, exchange, routingKey);
};

export const publish = (
    channel: Channel,
    exchange: string,
    routingKey: string,
    message: object,
) => {
    const payload = Buffer.from(JSON.stringify(message));
    channel.publish(exchange, routingKey, payload);
    console.log(`Published to ${exchange} with key ${routingKey}`);
};
