import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import CatalogItem from '../entities/catalog-item';

@Injectable()
export class ReflectionService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
  ) {}

  async reflect(
    catalogItemId: number,
    text: string,
    learnerId: number,
  ): Promise<void> {
    const catalogItem = await this.catalogItemRepository.findOne(catalogItemId);
    catalogItem.reflect(text, learnerId);
    await this.catalogItemRepository.flush();
  }
}
