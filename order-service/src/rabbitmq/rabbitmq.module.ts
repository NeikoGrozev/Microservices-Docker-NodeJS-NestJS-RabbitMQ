import { Global, Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule {}
