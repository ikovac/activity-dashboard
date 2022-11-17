import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import Rating from './rating';
import Reflection from './reflection';

@Entity()
class CatalogItem extends BaseEntity {
  @Property()
  title: string;

  @Property()
  description: string;

  @OneToMany({
    entity: () => Rating,
    mappedBy: (it) => it.catalogItem,
    eager: true,
    hidden: true,
  })
  _ratings = new Collection<Rating>(this);

  @OneToMany({
    entity: () => Reflection,
    mappedBy: (it) => it.catalogItem,
    eager: true,
    hidden: true,
  })
  _reflections = new Collection<Reflection>(this);

  constructor(title: string, description: string) {
    super();
    this.title = title;
    this.description = description;
  }

  @Property({ persist: false })
  get ratings() {
    return this._ratings.getItems(true);
  }

  @Property({ persist: false })
  get reflections() {
    return this._reflections.getItems(true);
  }

  rate(value: number, learnerId: number) {
    const rating = new Rating(value, learnerId);
    if (this.ratings.some((it) => it.learnerId === learnerId)) return;
    this._ratings.add(rating);
  }

  reflect(text: string, learnerId: number) {
    const reflection = new Reflection(text, learnerId);
    this._reflections.add(reflection);
  }
}

export default CatalogItem;
