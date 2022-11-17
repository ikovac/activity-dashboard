import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import CatalogItem from '../entities/catalog-item';

@Injectable()
export class CatalogItemService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
  ) {}

  async getAll(): Promise<CatalogItem[]> {
    const catalogItems = await this.catalogItemRepository.findAll();
    return catalogItems;
  }
}
