import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import CatalogItem from '../entities/catalog-item';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
  ) {}

  async rate(
    catalogItemId: number,
    value: number,
    learnerId: number,
  ): Promise<void> {
    const catalogItem = await this.catalogItemRepository.findOne(catalogItemId);
    catalogItem.rate(value, learnerId);
    await this.catalogItemRepository.flush();
  }
}
