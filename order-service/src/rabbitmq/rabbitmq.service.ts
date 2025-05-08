import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor(private configService: ConfigService) {}

    async onModuleInit() {
        try {
            await this.connect();
        } catch (error) {
            console.error('Error initializing RabbitMQ:', error);
        }
    }

    private async connect() {
        try {
            const rabbitMQUrl = this.configService.get<string>('RABBITMQ_URL');

            if (!rabbitMQUrl) {
                throw new Error(
                    'RABBITMQ_URL is not defined in environment variables',
                );
            }

            this.connection = await amqp.connect(rabbitMQUrl);

            if (!this.connection) {
                throw new Error('Failed to establish RabbitMQ connection');
            }

            this.channel = await this.connection.createChannel();
            console.log('RabbitMQ connected successfully');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ:', error);
        }
    }

    assertExchange = async (exchange: string, options = { durable: false }) => {
        await this.channel.assertExchange(exchange, 'direct', options);
    };

    assertQueue = async (queue: string, options = { durable: false }) => {
        await this.channel.assertQueue(queue, options);
    };

    bindQueue = async (exchange: string, queue: string, routingKey: string) => {
        await this.channel.bindQueue(queue, exchange, routingKey);
    };

    sendMessage = (queue: string, message: object) => {
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    };

    publish(exchange: string, routingKey: string, message: object) {
        const payload = Buffer.from(JSON.stringify(message));
        this.channel.publish(exchange, routingKey, payload);
        console.log(`Published to ${exchange} with key ${routingKey}`);
    }

    async consume(
        queue: string,
        onMessage: (msg: amqp.Message) => Promise<void>,
    ) {
        await this.channel.consume(queue, async (msg) => {
            if (msg) {
                try {
                    await onMessage(msg);
                    this.channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                    this.channel.nack(msg);
                }
            }
        });
    }

    async close() {
        await this.channel.close();
        await this.connection.close();
    }
}
