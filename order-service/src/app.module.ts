import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
    imports: [OrdersModule, RabbitMQModule, SwaggerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
