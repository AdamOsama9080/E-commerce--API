// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { ProductsDto } from './dto/products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema'; // Use the correct interface

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productsModel: Model<Product>) { }

    async createBulkProducts(productsDto: ProductsDto[]): Promise<{ message: string, total: number }> {
        // Save the products to the database
        await this.productsModel.insertMany(productsDto);
        return {
            message: 'Bulk products created successfully',
            total: productsDto.length,
        };
    }

    async deleteByModelNumber(modelNumber: string): Promise<{ message: string }> {
        const result = await this.productsModel.deleteOne({ modelNumber }).exec();
        if (result.deletedCount === 0) {
            throw new Error(`Product with model number ${modelNumber} not found`);
        }
        return { message: 'Product deleted successfully' };
    }
}
