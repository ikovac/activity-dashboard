import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogItemController } from './api/catalog-item.controller';
import databaseConfig from './config/database.config';
import CatalogItem from './core/catalog-item.entity';
import Rating from './core/rating.entity';
import Reflection from './core/reflection.entity';
import User from './core/user.entity';
import entities from './shared/database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        entities,
      }),
    }),
    MikroOrmModule.forFeature([CatalogItem, User, Rating, Reflection]),
  ],
  controllers: [CatalogItemController],
  providers: [],
})
export class AppModule {}
