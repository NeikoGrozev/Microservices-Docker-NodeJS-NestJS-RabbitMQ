import { Controller } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { SwaggerService } from './swagger.service';

@Controller()
export class SwaggerController {
    constructor(private readonly swaggerService: SwaggerService) {}

    @ApiExcludeEndpoint()
    getSwaggerJson() {
        return this.swaggerService.getDocument();
    }
}
