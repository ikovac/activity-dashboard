import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import CatalogItem from './catalog-item';

@Entity()
class Rating extends BaseEntity {
  @Property()
  value: number;

  @Property()
  learnerId: number;

  @ManyToOne({
    entity: () => CatalogItem,
    serializer: (it: CatalogItem) => it.id,
  })
  catalogItem: CatalogItem;

  constructor(value: number, learnerId: number) {
    super();
    this.value = value;
    this.learnerId = learnerId;
  }
}

export default Rating;
