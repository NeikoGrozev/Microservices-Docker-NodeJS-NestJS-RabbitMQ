import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
    imports: [PrismaModule, ConfigModule, RabbitMQModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
