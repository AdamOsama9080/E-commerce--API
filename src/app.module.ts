import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProtectedController } from './protected/protected.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [RegisterModule ,ProductsModule, MongooseModule.forRoot('mongodb://localhost:27017/e-commerce') ],
  controllers: [AppController, ProtectedController],
  providers: [AppService],
})
export class AppModule {}
