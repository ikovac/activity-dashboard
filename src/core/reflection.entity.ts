import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import CatalogItem from './catalog-item.entity';

@Entity()
class Reflection extends BaseEntity {
  @Property()
  text: string;

  @Property()
  userId: number;

  @ManyToOne({
    entity: () => CatalogItem,
    serializer: (it: CatalogItem) => it.id,
  })
  catalogItem: CatalogItem;

  constructor(text: string, userId: number) {
    super();
    this.text = text;
    this.userId = userId;
  }
}

export default Reflection;
