import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import CatalogItem from './catalog-item';

@Entity()
class Reflection extends BaseEntity {
  @Property()
  text: string;

  @Property()
  learnerId: number;

  @ManyToOne({
    entity: () => CatalogItem,
    serializer: (it: CatalogItem) => it.id,
  })
  catalogItem: CatalogItem;

  constructor(text: string, learnerId: number) {
    super();
    this.text = text;
    this.learnerId = learnerId;
  }
}

export default Reflection;
