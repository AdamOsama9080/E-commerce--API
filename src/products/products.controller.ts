// products.controller.ts
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './dto/products.dto';

@Controller('products') // This defines the base route
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('add-product') // This defines the specific route for the POST request
    createBulkProducts(@Body() products: ProductsDto[]) {
        return this.productsService.createBulkProducts(products);
    }

    @Delete(':modelNumber') // Add a DELETE route for deleting by model number
    deleteProduct(@Param('modelNumber') modelNumber: string) {
        return this.productsService.deleteByModelNumber(modelNumber);
    }
}
