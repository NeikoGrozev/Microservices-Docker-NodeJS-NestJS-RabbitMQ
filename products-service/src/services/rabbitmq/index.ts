import amqp, { Connection } from 'amqplib';
import { rabbitMQListener } from './rabbitMQService';

const rabbitMQUrl = process.env.RABBITMQ_URL || '';

export const connectRabbitMQ = async () => {
    try {
        const connection: Connection = await amqp.connect(rabbitMQUrl);
        if (!connection) {
            throw new Error('Failed to establish RabbitMQ connection');
        }

        const channel = await connection.createChannel();
        console.log('RabbitMQ connected successfully');

        await rabbitMQListener(channel);
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
};
