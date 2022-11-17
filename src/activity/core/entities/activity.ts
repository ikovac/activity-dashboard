import { Entity, Enum, Property } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';
import { ValuesType } from 'utility-types';

const Type = {
  REFLECTED: 'REFLECTED',
  RATED: 'RATED',
} as const;
export type Type = ValuesType<typeof Type>;

@Entity()
class Activity extends BaseEntity {
  @Property()
  learnerId: number;

  @Enum()
  type: Type;

  @Property()
  timestamp: Date;

  constructor(learnerId: number, type: Type, timestamp: Date) {
    super();
    this.learnerId = learnerId;
    this.type = type;
    this.timestamp = timestamp;
  }
}

export default Activity;
