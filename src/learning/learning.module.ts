import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RatingService } from './core/app-services/rating.service';
import { ReflectionService } from './core/app-services/reflection.service';
import CatalogItem from './core/entities/catalog-item';
import Rating from './core/entities/rating';
import Reflection from './core/entities/reflection';

@Module({
  imports: [MikroOrmModule.forFeature([CatalogItem, Rating, Reflection])],
  controllers: [],
  providers: [RatingService, ReflectionService],
})
export class RatingModule {}
