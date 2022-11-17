import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import CatalogItem from '../entities/catalog-item';

@Injectable()
export class ReflectionService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
    @Inject('LEARNING_EVENT_PUBLISHER')
    private eventPublisher: ClientProxy,
  ) {}

  async reflect(
    catalogItemId: number,
    text: string,
    learnerId: number,
  ): Promise<void> {
    const catalogItem = await this.catalogItemRepository.findOne(catalogItemId);
    catalogItem.reflect(text, learnerId);
    await this.catalogItemRepository.flush();
    this.eventPublisher.emit('REFLECTION_CREATED', {
      catalogItemId,
      learnerId,
      timestamp: new Date(),
    });
  }
}
