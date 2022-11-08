import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'catalog_item';

export class CreateUser extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createCatalogItemTable = knex.schema.createTable(
      TABLE_NAME,
      (table) => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table
          .timestamp('created_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
      },
    );

    this.addSql(createCatalogItemTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}