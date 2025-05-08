import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from 'src/interfaces/OrderProps';
import { ApiProperty } from '@nestjs/swagger';

class UpdateOrderItemDto {
    @ApiProperty({
        description: 'The unique identifier of the product.',
        example: 'afgd-fhbc-12g3',
    })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({
        description: 'The price of the product.',
        example: 25.99,
    })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: 'The quantity of the product to be updated.',
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class UpdateOrderDto {
    @ApiProperty({
        description: 'List of items in the order to be updated.',
        type: [UpdateOrderItemDto],
        minItems: 1,
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => UpdateOrderItemDto)
    orderItems: UpdateOrderItemDto[];

    @ApiProperty({
        description: 'The unique identifier of the customer for the order.',
        example: 'customer321',
    })
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @ApiProperty({
        description: 'Shipping address for the updated order.',
        example: '456 Another St, Springfield, USA',
    })
    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @ApiProperty({
        description: 'The status of the order (e.g., pending, completed).',
        example: 'pending',
    })
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({
        description:
            'Optional notes or special instructions for the updated order.',
        example: 'Please deliver before 5 PM.',
        required: false,
    })
    @IsOptional()
    @IsString()
    notes: string;
}
