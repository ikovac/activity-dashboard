import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import CatalogItem from './catalog-item.entity';

@Entity()
class Rating extends BaseEntity {
  @Property()
  value: number;

  @Property()
  userId: number;

  @ManyToOne({
    entity: () => CatalogItem,
    serializer: (it: CatalogItem) => it.id,
  })
  catalogItem: CatalogItem;

  constructor(value: number, userId: number) {
    super();
    this.value = value;
    this.userId = userId;
  }
}

export default Rating;
