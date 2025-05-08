import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'Returns all orders' })
    @Get()
    getOrders() {
        return this.ordersService.getAllOrders();
    }

    @ApiOperation({ summary: 'Get a specific order by ID' })
    @ApiResponse({ status: 200, description: 'Returns the order by ID' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the order' })
    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersService.getOrderById(id);
    }

    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order has been created' })
    @Post()
    createOrders(@Body() data: CreateOrderDto) {
        return this.ordersService.createOrder(data);
    }

    @ApiOperation({ summary: 'Update an existing order' })
    @ApiResponse({ status: 200, description: 'Order has been updated' })
    @ApiParam({
        name: 'id',
        description: 'The unique identifier of the order to be updated',
    })
    @Patch(':id')
    updateOrder(@Param('id') id: string, @Body() data: UpdateOrderDto) {
        return this.ordersService.updateOrder(id, data);
    }

    @ApiOperation({ summary: 'Delete an existing order' })
    @ApiResponse({ status: 200, description: 'Order has been deleted' })
    @ApiParam({
        name: 'id',
        description: 'The unique identifier of the order to be deleted',
    })
    @Delete(':id')
    deleteOrder(@Param('id') id: string) {
        return this.ordersService.deleteOrder(id);
    }

    @ApiOperation({ summary: 'Remove all orders' })
    @ApiResponse({ status: 200, description: 'All orders have been removed' })
    @Delete()
    removeAllOrders() {
        return this.ordersService.removeAllOrders();
    }
}
