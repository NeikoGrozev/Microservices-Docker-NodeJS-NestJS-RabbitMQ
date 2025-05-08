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
import { ApiProperty } from '@nestjs/swagger';

class CreateOrderItemDto {
    @ApiProperty({
        description: 'The unique identifier of the product.',
        example: 'dlf-1f23-sk4k',
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
        description: 'The quantity of the product ordered.',
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({
        description: 'List of items in the order.',
        type: [CreateOrderItemDto],
        minItems: 1,
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @ApiProperty({
        description: 'The unique identifier of the customer placing the order.',
        example: 'customer123',
    })
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @ApiProperty({
        description: 'Shipping address for the order.',
        example: '123 Main St, Springfield, USA',
    })
    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @ApiProperty({
        description: 'Optional notes or special instructions for the order.',
        example: 'Please deliver between 3-5 PM.',
        required: false,
    })
    @IsOptional()
    @IsString()
    notes: string;
}
