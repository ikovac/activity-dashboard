import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import CatalogItem from 'src/core/catalog-item.entity';

type RateDto = {
  value: number;
  userId: number;
};

type ReflectionDto = {
  text: string;
  userId: number;
};

@Controller('catalog-items')
export class CatalogItemController {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
    private readonly em: EntityManager,
  ) {}

  @Get()
  // Return all catalog items with ratings and reflections filtered for specific user
  async getAll(@Query('userId') userId: number): Promise<CatalogItem[]> {
    const qb = this.em.createQueryBuilder(CatalogItem);
    const query = qb
      .select('*')
      .leftJoinAndSelect('_ratings', 'r', { 'r.user_id': userId })
      .leftJoinAndSelect('_reflections', 'rf', { 'rf.user_id': userId });
    const results = await query.execute();
    return results.map((it) => this.catalogItemRepository.map(it));
  }

  @Post(':id/ratings')
  async rate(
    @Param('id') id: number,
    @Body() { value, userId }: RateDto,
  ): Promise<CatalogItem> {
    const catalogItem = await this.catalogItemRepository.findOne(id);
    catalogItem.rate(value, userId);
    await this.catalogItemRepository.flush();
    return catalogItem;
  }

  @Post(':id/reflections')
  async reflect(
    @Param('id') id: number,
    @Body() { text, userId }: ReflectionDto,
  ): Promise<CatalogItem> {
    const catalogItem = await this.catalogItemRepository.findOne(id);
    catalogItem.reflect(text, userId);
    await this.catalogItemRepository.flush();
    return catalogItem;
  }
}
