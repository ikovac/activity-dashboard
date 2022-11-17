import { Entity, Property } from '@mikro-orm/core';

@Entity()
class Progress {
  @Property({ primary: true })
  learnerId: number;

  @Property({ primary: true })
  itemId: number;

  @Property({ fieldName: 'is_rated' })
  private _isRated = false;

  @Property({ fieldName: 'is_reflected' })
  private _isReflected = false;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(learnerId: number, itemId: number) {
    this.learnerId = learnerId;
    this.itemId = itemId;
  }

  @Property({ persist: false })
  get isRated(): boolean {
    return this._isRated;
  }

  @Property({ persist: false })
  get isReflected(): boolean {
    return this._isReflected;
  }

  completeRating() {
    this._isRated = true;
  }

  completeReflecting() {
    this._isReflected = true;
  }
}

export default Progress;
