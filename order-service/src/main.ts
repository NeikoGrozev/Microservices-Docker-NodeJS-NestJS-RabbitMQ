import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './swagger/swagger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const swaggerService = app.get(SwaggerService);
    swaggerService.generateSwaggerDocument(app);

    await app.listen(process.env.PORT ?? 5011);
}
bootstrap();
