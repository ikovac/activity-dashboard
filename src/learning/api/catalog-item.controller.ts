import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatalogItemService } from 'learning/core/app-services/catalog-item.service';
import { RatingService } from 'learning/core/app-services/rating.service';
import { ReflectionService } from 'learning/core/app-services/reflection.service';
import CatalogItem from 'learning/core/entities/catalog-item';

type RateDto = {
  value: number;
  learnerId: number;
};

type ReflectionDto = {
  text: string;
  learnerId: number;
};

@Controller('catalog-items')
export class CatalogItemController {
  constructor(
    private catalogItemService: CatalogItemService,
    private ratingService: RatingService,
    private reflectionService: ReflectionService,
  ) {}

  @Get()
  // Return all catalog items with ratings and reflections filtered for specific user
  async getAll(): Promise<CatalogItem[]> {
    return this.catalogItemService.getAll();
  }

  @Post(':id/ratings')
  async rate(
    @Param('id') id: number,
    @Body() { value, learnerId }: RateDto,
  ): Promise<void> {
    await this.ratingService.rate(id, value, learnerId);
  }

  @Post(':id/reflections')
  async reflect(
    @Param('id') id: number,
    @Body() { text, learnerId }: ReflectionDto,
  ): Promise<void> {
    await this.reflectionService.reflect(id, text, learnerId);
  }
}
