import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';

@Entity()
class User extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export default User;
