import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CatalogItemController } from 'learning/api/catalog-item.controller';
import { CatalogItemService } from './core/app-services/catalog-item.service';
import { RatingService } from './core/app-services/rating.service';
import { ReflectionService } from './core/app-services/reflection.service';
import CatalogItem from './core/entities/catalog-item';
import Rating from './core/entities/rating';
import Reflection from './core/entities/reflection';

@Module({
  imports: [MikroOrmModule.forFeature([CatalogItem, Rating, Reflection])],
  controllers: [CatalogItemController],
  providers: [CatalogItemService, RatingService, ReflectionService],
})
export class LearningModule {}
