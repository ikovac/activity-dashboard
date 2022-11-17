import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import CatalogItem from '../entities/catalog-item';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
    @Inject('LEARNING_EVENT_PUBLISHER')
    private eventPublisher: ClientProxy,
  ) {}

  async rate(
    catalogItemId: number,
    value: number,
    learnerId: number,
  ): Promise<void> {
    const catalogItem = await this.catalogItemRepository.findOne(catalogItemId);
    catalogItem.rate(value, learnerId);
    await this.catalogItemRepository.flush();
    this.eventPublisher.emit('RATING_CREATED', {
      catalogItemId,
      learnerId,
      timestamp: new Date(),
    });
  }
}
