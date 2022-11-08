import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import Rating from './rating.entity';
import Reflection from './reflection.entity';

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
    return this._ratings.getItems();
  }

  @Property({ persist: false })
  get reflections() {
    return this._reflections.getItems();
  }

  rate(value: number, userId: number) {
    const rating = new Rating(value, userId);
    if (this.ratings.some((it) => it.userId === userId)) return;
    this._ratings.add(rating);
  }

  reflect(text: string, userId: number) {
    const reflection = new Reflection(text, userId);
    this._reflections.add(reflection);
  }
}

export default CatalogItem;
